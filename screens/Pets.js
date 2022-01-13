import {View, Text, ActivityIndicator, StyleSheet, Image, RefreshControl, Button} from "react-native";
import {useEffect, useLayoutEffect, useState} from "react";
import styled from "styled-components";
const axios = require("axios");
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Pets = ({navigation})=>{
    const [pets,setPets] = useState([]);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        const fetch = async () => {
           try{
               const response = await axios.get("https://protected-falls-05965.herokuapp.com/read");
               setLoading(false)
               setPets(response.data);
           }
           catch(error){
               console.log(error);
           }
        }
        fetch()
    },[]);
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: () => (
                <AddPet onPress={()=>navigation.navigate("AddPet")}>
                    <MaterialIcons name="add" color="white" size={20}/>
                    <Text style={{color:"white"}}>Add Pet</Text>
                </AddPet>
            ),
        });
    },[])
    const fetch = async () => {
        try{
            const response = await axios.get("https://protected-falls-05965.herokuapp.com/read");
            setLoading(false)
            setPets(response.data);
        }
        catch(error){
            console.log(error);
        }
    }
    return(
        <Container
            refreshControl={
                <RefreshControl
                    refreshing={loading}
                    onRefresh={fetch}
                />
            }
        >
            {
               loading ? <ActivityIndicator size="large" color={"blue"} /> : pets.map(pet=>{
                   return(
                       <Card key={pet._id}>
                           <PetImage source={{uri:pet.image}}/>
                           <PetInfo>
                               <PetName>{`Name: ${pet.name}`}</PetName>
                               <PetAge>{`Age: ${pet.age}`}</PetAge>
                           </PetInfo>
                           <PetButtons>
                               <PetButton opacity={0.9}>
                                   <MaterialIcons name="assignment" color="white" size={20}/>
                                   <Text style={{color:"white"}}>Applicants</Text>
                               </PetButton>
                               <PetButton>
                                   <MaterialIcons name="notifications" color="white" size={20}/>
                                   <Text style={{color:"white"}}>Remainder</Text>
                               </PetButton>
                               <PetButton>
                                   <MaterialIcons name="backup" color="white" size={20}/>
                                   <Text style={{color:"white"}}>Video</Text>
                               </PetButton>
                           </PetButtons>
                       </Card>
                   )
               })
            }
        </Container>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

const Container = styled.ScrollView`
    flex: 1;
`
const Card = styled.View`
    width:90%;
    height:auto;
  border-radius:10px;
    align-self: center;
      margin-top: 10px;
      margin-bottom: 10px;
      background-color: white;
`
const PetImage = styled.Image`
    width:100%;
    height:150px;
    border-radius:10px;
`
const PetInfo = styled.View`
    padding: 10px;
`
const PetName = styled.Text`
    font-size:20px;
    font-weight:bold;
    margin-top:10px;
    margin-left: 20px;
`
const PetAge = styled.Text`
    font-size:20px;
    font-weight:bold;
    margin-left: 20px;
`
const PetButtons = styled.View`
    flex-direction:row;
    justify-content:space-evenly;
    margin-top:10px;
  `
const PetButton = styled.TouchableOpacity`
    width:30%;
    height:auto;
  padding: 2px 5px;
    border-radius:10px;
    background-color: #00bfff;
    align-items:center;
    justify-content:center;
    margin-top:10px;
    margin-bottom:10px;
  `
const AddPet = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
    width:auto;
    height:auto;
    padding: 5px 8px;
    border-radius:10px;
    background-color: #00bfff;
    align-items:center;
    justify-content:center;
    margin-top:10px;
    margin-bottom:10px;
  `

export default Pets;