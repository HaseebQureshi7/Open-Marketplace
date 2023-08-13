export const AuthToken = ({userToken}:{userToken : string}) => {
    return {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
  }
}