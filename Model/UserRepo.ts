import { Repository } from './Repository';

class UserRepo {
  public id: string;

  public repoName: string;

  public createdAt: string;

  public ownerName: string;

  public description: null | string | any;

  constructor(data: Repository) {
    this.id = data.id;
    this.repoName = data.name;
    this.createdAt = data.createdAt;
    this.ownerName = data.owner.login;
    this.description = data.description;
  }
}
export default UserRepo;
