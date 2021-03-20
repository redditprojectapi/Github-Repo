type RepoOwnerType = {
  id: string,
  login: string
};

export type Repository = {
  name: string,
  id: string,
  createdAt: string,
  owner: RepoOwnerType,
  description: null | string
};

type PageInfoType = {
  endCursor: string
};

type Repositories = {
  pageInfo: PageInfoType,
  nodes: Repository[]
};

type RepositoriesParams = {
  repositories: Repositories
};

type RepoViewerParams = {
  viewer: RepositoriesParams
};

export type RepositoryConstructorParams = {
  data: RepoViewerParams
};
