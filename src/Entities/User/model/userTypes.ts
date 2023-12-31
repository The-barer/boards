export interface IUserProfileData {
    email: string
    authUserId: string | null
    userName: string | null
    photo: string | null
    isActiveted: boolean
    createdAt: Date
    updatedAt: Date
}

export interface IUserLoginData {
    email: string
    password: string
}

export interface IUserCreateProfile extends IUserLoginData {
    userName?: string | null
    photo?: string | null
}
export interface IUserUpdateData extends Partial<IUserCreateProfile> {}

export interface IUserActivated {
    email: string
}

export interface UserState {
    profile: IUserProfileData | null
}
