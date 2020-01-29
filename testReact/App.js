import React, {Component} from 'react';
import { Input, Button, Viewm, TextInput, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ReactDOM from "react-dom";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from "react-redux";
import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import store from "./store";
import showResults from "./showResults";
import CreateUserForm from "/pages/CreateUserPage";

const rootEl = document.getElementById("root");

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
    this.schools = [];
  }
  componentWillMount() {
    fetch("http://192.168.0.99/test/public/api/users", {
      method: 'GET', headers: {
        'Accept': 'application/json',
        //'Authorization': 'Bearer ' + generateKey(token)
        // 'Content-Type': 'application/json'
      },
    }).then(res => res.json()).then(
      (result) => {
        this.setState({
          isLoaded: true,
          users: result
        });
        //console.log(result);
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
        //console.log(error);
      }
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
          Lista de usuarios
        </Text>
        <table border="0" align="center">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th> 
              <th>Correo</th> 
              <th>Nombre de usuario</th> 
              <th>Colegio</th>                   
            </tr>
          </thead>
          <tbody>  
            {this.state.users.map(usr => {
              return (
                <tr key={usr.id}>
                  <td>{usr.id}</td>
                  <td>{usr.name}</td>
                  <td>{usr.email}</td>
                  <td>{usr.username}</td>
                  <td>{usr.school.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Button
          title="Crear Usuario"
          color="#fF44Af"
          onPress={() => this.props.navigation.navigate('CrearUsuario')}
        />
      </View>
    );
  }
}

class CreateUserScreen extends React.Component {
  constructor(props) {
    super(props);
    this.schools = [];
  }
  componentWillMount() {
    fetch("http://192.168.0.99/test/public/api/school", {
      method: 'GET', headers: {
        'Accept': 'application/json',
        //'Authorization': 'Bearer ' + generateKey(token)
        // 'Content-Type': 'application/json'
      },
    }).then(res => res.json()).then(
      (result) => {
        this.schools = result;
        console.log(this.schools);
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
        //console.log(error);
      }
    )
  }
  render() {
    return <CreateUserForm onSubmit={this.submit} />
  }
}

const RootStack = createStackNavigator(
  {
    Usuarios: HomeScreen,
    CrearUsuario: CreateUserScreen,
  },
  {
    initialRouteName: 'Usuarios',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render(){
    return <AppContainer />;
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 20,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },
});