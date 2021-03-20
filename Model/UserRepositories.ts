import { Repository, RepositoryConstructorParams } from './Repository';
import UserRepo from './UserRepo';

class UserRepositories {
  public repo!: UserRepo;

  public repositoryData: Repository[];

  public processedData: UserRepo[] = [];

  public lastPageCursor: string | null = null;

  constructor(responseData: RepositoryConstructorParams) {
    this.repositoryData = responseData.data.viewer.repositories.nodes;
    this.repositoryData.forEach((rep) => {
      this.repo = new UserRepo(rep);
      this.processedData.push(this.repo);
    });
    this.lastPageCursor = responseData.data.viewer.repositories.pageInfo.endCursor;
  }
}

export default UserRepositories;
