import React, { useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import Constants from "expo-constants";
import { addTodos, removeTodos, updateTodos } from "../redux/reducer";
import Spacer from "../components/Spacer";
import ButtonIcon from "../components/ButtonIcon";
import { Title, Paragraph, Card, Button, TextInput } from "react-native-paper";
import { FontAwesome as Icon } from "@expo/vector-icons";
import { connect } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

const TodoApp = (props) => {
  const [todo, setTodo] = React.useState("");
  const [update, setUpdate] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [inputText, setInputText] = React.useState();
  const [editItem, setEditItem] = React.useState();

  const handleAddTodo = () => {
    props.addTodo({
      id: Math.floor(Math.random() * 1000),
      item: todo,
    });
    setTodo("");
  };

  const onPressItem = (item) => {
    setIsModalVisible(true);
    setInputText(item.item);
    setEditItem(item.id);
  };

  const onPressSaveEdit = () => {
    props.updateTodo({ id: editItem, item: inputText });
    setIsModalVisible(false);
  };

  const handleDeleteTodo = (id) => {
    props.removeTodo(id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <Card.Content>
          <Title>Add ToDo Here</Title>
          <TextInput
            mode="outlined"
            label="Task"
            value={todo}
            onChangeText={(todo) => setTodo(todo)}
          />
          <Spacer />
          <Button
            mode="contained"
            disabled={todo.length == 0}
            onPress={handleAddTodo}
          >
            Add Todo
          </Button>
        </Card.Content>
      </Card>
      <Spacer />
      <FlatList
        data={props.todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          return (
            <>
              <Card>
                <Card.Title
                  title={`Task#${index}`}
                  left={(props) => (
                    <TouchableOpacity>
                      <Icon
                        name="edit"
                        size={24}
                        color="green"
                        onPress={() => onPressItem(item)}
                      />
                    </TouchableOpacity>
                  )}
                  right={(props) => (
                    <ButtonIcon
                      iconName="close"
                      color="red"
                      onPress={() => handleDeleteTodo(item.id)}
                    />
                  )}
                />
                <Card.Content>
                  <TouchableOpacity>
                    <Text>{item.item}</Text>
                  </TouchableOpacity>
                </Card.Content>
              </Card>
              <Spacer />
            </>
          );
        }}
      />
      <Modal
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Card>
            <Card.Content>
              <Title>Update Text</Title>
              <TextInput
                mode="outlined"
                label="Update Task"
                onChangeText={(text) => setInputText(text)}
                value={inputText}
                editable={true}
              />
              <Spacer />
              <Button mode="contained" onPress={() => onPressSaveEdit()}>
                Update Task
              </Button>
            </Card.Content>
          </Card>
        </View>
      </Modal>
      <Spacer />
    </SafeAreaView>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
    removeTodo: (id) => dispatch(removeTodos(id)),
    updateTodo: (obj) => dispatch(updateTodos(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 10,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalView: {
    flex: 1,
    alignItem: "center",
    justifyContent: "center",
  },
});
