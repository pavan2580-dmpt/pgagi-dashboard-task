"use client";

const GITHUB_USERNAME =
  process.env.NEXT_PUBLIC_GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

const headers: Record<string, string> = GITHUB_TOKEN
  ? { Authorization: `token ${GITHUB_TOKEN}` }
  : {};

export interface GitHubData {
  user: {
    username: string;
    name: string;
    avatar: string;
    followers: number;
    following: number;
    bio: string | null;
  };
  repositories: {
    name: string;
    description: string | null;
    language: string | null;
    stars: number;
    forks: number;
    issues: number;
    lastUpdated: string;
  }[];
  commits: {
    repo: string;
    message: string;
    date: string;
    hash: string;
  }[];
  pullRequests: {
    title: string;
    repo: string;
    status: string;
    date: string;
  }[];
}

export const fetchGitHubProfile = async (): Promise<GitHubData | null> => {
  try {
    // Fetch user data
    const userResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}`,
      { headers }
    );
    const userData = await userResponse.json();

    // Fetch repositories
    const reposResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos`,
      { headers }
    );
    const reposData = await reposResponse.json();

    // Fetch recent commits
    const commitsData = await Promise.all(
      reposData.slice(0, 5).map(async (repo: { name: string }) => {
        const commitsResponse = await fetch(
          `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits`,
          { headers }
        );
        const commits = await commitsResponse.json();
        return commits.length > 0
          ? {
              repo: repo.name,
              message: commits[0].commit.message,
              date: commits[0].commit.author.date,
              hash: commits[0].sha.substring(0, 7),
            }
          : null;
      })
    );

    // Fetch pull requests
    const prsData = await Promise.all(
      reposData.slice(0, 5).map(async (repo: { name: string }) => {
        const prsResponse = await fetch(
          `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/pulls`,
          { headers }
        );
        const prs = await prsResponse.json();
        return prs.map(
          (pr: { title: string; state: string; created_at: string }) => ({
            title: pr.title,
            repo: repo.name,
            status: pr.state === "open" ? "Open" : "Closed",
            date: pr.created_at,
          })
        );
      })
    );

    return {
      user: {
        username: userData.login,
        name: userData.name,
        avatar: userData.avatar_url,
        followers: userData.followers,
        following: userData.following,
        bio: userData.bio,
      },
      repositories: reposData.slice(0,4).map((repo: any) => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        issues: repo.open_issues_count,
        lastUpdated: new Date(repo.updated_at).toLocaleDateString(),
      })),
      commits: commitsData.filter(Boolean),
      pullRequests: prsData.flat(),
    };
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return null;
  }
};
