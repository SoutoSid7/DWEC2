function Login(props) {
    const user = {
        username: "",
        email: ""
    }

    const setUsername = (e) => {
        user.username = e.target.value
    }

    const setEmail = (e) => {
        user.email = e.target.value
    }

    const handleSumbit = (e) => {
        e.preventDefault()
        console.log(user)
        props.handleLogin(user)
    }

    return (
        <section>
            <h2>Login section</h2>
            <form onSubmit={handleSumbit}>
                <fieldset>
                    <label htmlFor="username">Username: </label>
                    <input type="text" id="username" onChange={setUsername} />
                </fieldset>
                <fieldset>
                    <label htmlFor="email">Email: </label>
                    <input type="text" id="email" onChange={setEmail} />
                </fieldset>
                <button>Login</button>
            </form>
        </section>
    )
}

export default Login