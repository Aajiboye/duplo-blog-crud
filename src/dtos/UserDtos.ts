 interface RegisterUserDto {
    firstName: string,
    lastName: string,
    email: string
}

interface SignInDto {
    email: string
}

interface SignInResponseDto {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    token?: string
}

export {
    RegisterUserDto,
    SignInDto,
    SignInResponseDto
}