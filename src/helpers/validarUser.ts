export const validateUser = (user: unknown): void => {
  if (!user) {
    throw new Error("Usuario no autenticado!!!");
  }
}
