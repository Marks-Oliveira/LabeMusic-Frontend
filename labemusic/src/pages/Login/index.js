import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../constants";
import { useHistory } from "react-router";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import logo from "../../images/logo-labemusic.png";
import { 
  AvatarContent,
  ImageContent,
  ImageLogo, 
  LinkToSignup, 
  LoginContainer, 
  LoginContent
} from "./styles";

const Login = () => {

  const [emailOrNickname, setEmailOrNickname] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("accessToken") !== null) {
      history.replace("/musics");
    }
  }, [])

  const handleGoToSignup = () => {
    history.push("/signup");
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    const body = {
      emailOrNickname: emailOrNickname,
      password: password
    };

    try {
      const response = await axios.post(`${baseUrl}/user/login`, body);
  
      localStorage.setItem("accessToken", response.data.accessToken);
      history.replace("/musics");
      
    } catch (error) {
      alert("Login falhou :(");
    }
  };

  return (
    <div>
      <LoginContainer>
        <ImageContent>
          <ImageLogo src={logo} alt="Logo Labemusic" />
        </ImageContent>
        <LoginContent>
          <Container component="main" maxWidth="xs">
            <div>
              <AvatarContent>
                <Avatar>
                  <LockOutlinedIcon color="primary"/>
                </Avatar>
                <Typography component="h1" variant="h5">
                  Login
                </Typography>
              </AvatarContent>
              <form onSubmit={handleLogin}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email ou Nickname"
                  name="email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                  value={emailOrNickname}
                  onChange={e => setEmailOrNickname(e.target.value)}
                  inputProps={{
                    "data-testid": "user-input"
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  placeholder="Mínimo 6 caracteres"
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  inputProps={{
                    pattern:"^[A-Za-z0-9@#%&*]{6,}",
                    "data-testid": "password-input"
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Entrar
                </Button>
                <Grid container>
                  <Grid item>
                    <LinkToSignup>
                      <Link onClick={handleGoToSignup} variant="body1">
                        {"Não possui conta? Cadastre-se"}
                      </Link>
                    </LinkToSignup>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        </LoginContent>
      </LoginContainer>
    </div>
  );

};

export default Login;