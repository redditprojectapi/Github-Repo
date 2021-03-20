export type TotalCount = {
  totalCount: number
};

export interface UserDataParams {
  avatarUrl: string,
  name: string,
  login: string,
  bio: string,
  websiteUrl: null | string,
  email: string,
  repositories: TotalCount,
  followers: TotalCount,
  following: TotalCount,
  createdAt: string
}

export type ViewerParams = {
  viewer: UserDataParams
};

export type ProfileConstructorParams = {
  data: ViewerParams
};

export class UserProfile {
  public avatarUrl: string;

  public name: string;

  public username: string;

  public bio: string;

  public websiteUrl: string | null;

  public email: string;

  public publicRepositoriesCount: number;

  public followersCount: number;

  public followingCount: number;

  public memberData: UserDataParams;

  constructor(profileData: ProfileConstructorParams) {
    this.memberData = profileData.data.viewer;
    this.avatarUrl = this.memberData.avatarUrl;
    this.name = this.memberData.name;
    this.username = this.memberData.login;
    this.bio = this.memberData.bio;
    this.websiteUrl = this.memberData.websiteUrl;
    this.email = this.memberData.email;
    this.publicRepositoriesCount = this.memberData.repositories.totalCount;
    this.followersCount = this.memberData.followers.totalCount;
    this.followingCount = this.memberData.following.totalCount;
  }

  // public getAvatarUrl(): string {
  //   return this.avatarUrl;
  // }

  // public getName(): string {
  //   return this.name;
  // }

  // public getUsername(): string {
  //   return this.username;
  // }

  // public getBio(): string {
  //   return this.bio;
  // }

  // public getWebsiteUrl(): string | null {
  //   return this.websiteUrl;
  // }

  // public getEmail(): string {
  //   return this.email;
  // }

  // public getPublicRepositoriesCount(): number {
  //   return this.publicRepositoriesCount;
  // }

  // public getFollowersCount(): number {
  //   return this.followersCount;
  // }

  // public getFollowingCount(): number {
  //   return this.followingCount;
  // }
}
