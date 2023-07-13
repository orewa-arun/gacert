
type HomeProps = {
    auth: boolean;
}

export function Home({ auth }: HomeProps) {
    return (auth ? <h1>Home</h1> : <h1>You don't have the authentication</h1>)
}