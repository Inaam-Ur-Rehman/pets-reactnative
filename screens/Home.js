import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native'
import {useState} from "react";
import * as ImagePicker from 'expo-image-picker';
import {Button, Image} from "react-native";

const Home = ({navigation}) =>{
    const [image, setImage] = useState(null);
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };
    const state = {
        data: [
            {id:1, title: "Pets", 'image':require("../assets/Home/pets.png")},
            {id:2, title: "Vets", image:require("../assets/Home/vets.png")},
            {id:3, title: "Adopt Pet", image:require("../assets/Home/adopt.png")} ,
            { id: 4, title: "Reminder", image: require("../assets/Home/reminders.png") },
            { id: 5, title: "News Feed", image: require("../assets/Home/pets.png") },
            {id:6, title: "Logout", image:require("../assets/Home/logout.png")}
        ]
    };
    return(
        <Container>

            <StatusBar style="auto" />

            <Grid>
                {state.data.map(item => (
                    <Item key={item.id} onPress={()=>navigation.navigate(item.title)}>
                        <Icon source={item.image} />
                        <Title>{item.title}</Title>
                    </Item>
                ))}

            </Grid>
        </Container>
    )
}

export default Home

const Container = styled.ScrollView`
    flex: 1;
    background-color: #eee;
    
  `

const Grid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;

`
const Item = styled.Pressable`
  min-width: 40%;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  background-color: aliceblue;
  border-radius: 10px;
  padding: 10px;
`
const Icon = styled.Image`
    width: 100px;
    height: 100px;

`
const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #000;
    margin-top: 10px;
`
const Heading = styled.Text`
    font-size: 30px;
    color: #000;
`
