import {Text, Alert} from "react-native";
import {useEffect, useLayoutEffect, useState} from "react";
import styled from "styled-components";
const axios = require("axios");
import * as yup from 'yup';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Formik,useField } from 'formik';
import {Picker} from '@react-native-community/picker';
import * as ImagePicker from "expo-image-picker";


const AddPet = ({navigation})=>{
    const [pets,setPets] = useState([]);
    const [loading,setLoading] = useState(true);
    const [type,setType] = useState("");
    const [gender,setGender] = useState("");
    const [image, setImage] = useState(null);
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

    //create yup schema
    const petValidationSchema = yup.object().shape({
        name: yup.string().required("Enter valid pet name"),
        type: yup.string().required("Select valid pet type"),
        gender: yup.string().required("Select valid pet gender"),
        age: yup.number().min(1,"Enter valid age").max(50, "Enter valid age").required("Enter valid pet age"),
    }
   )
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
            uploadImage()
        }
    };
    //function to add image to cloudinary using form data
    const uploadImage = async () => {
        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', 'pet-pictures');
        data.append('cloud_name', 'inam');
        const response = await fetch('https://api.cloudinary.com/v1_1/inam/image/upload', {
            method: 'POST',
            body: image,
        });
        // const file = await response.json();
        console.log(response);
    };


    return(
        <Container>
        <Formik
            initialValues={{name:"",type:"",gender:"",age:""}}
            validationSchema={petValidationSchema}
            onSubmit={async (values,actions)=>{

                try{
                    const {data} = await axios({
                        method:"POST",
                        url:"https://protected-falls-05965.herokuapp.com/create",
                        data:values
                    });
                    Alert.alert("Alert","Pet added successfully",[{text:"OK",onPress:()=>{
                        navigation.navigate("Pets");
                    }}]);
                    actions.resetForm();
                }
                catch (e) {
                    console.log(e);
                }

            }}>
            {({ handleChange,errors,touched, handleBlur, handleSubmit, values }) => (
                <FormContainer>
                    <Input
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                        placeholder="Enter pet name"
                    />
                    {touched.name && errors.name && <Errors>{errors.name}</Errors>}
                    <PickerView>
                        <Picker
                            enabled={true}
                            mode="dropdown"
                            placeholder="Select Pet Type"
                            selectedValue={values.type}
                            style={{ flex: 1, height: 50,fontSize:80,backgroundColor:"green'", borderRadius:20}}
                            onValueChange={(itemValue, itemIndex) =>{
                                handleChange('type')(itemValue)
                            }}
                        >
                            <Picker.Item label="Select pet type" value="" />
                            <Picker.Item label="Dog" value="Dog" />
                            <Picker.Item label="Cat" value="Cat" />
                            <Picker.Item label="Rabbit" value="Rabbit" />
                            <Picker.Item label="Other" value="Other" />
                        </Picker>
                    </PickerView>


                    {touched.type && errors.type && <Errors>{errors.type}</Errors>}
                    <Input
                        onChangeText={handleChange('age')}
                        onBlur={handleBlur('age')}
                        keyboardType={'numeric'}
                        value={values.age}
                        placeholder="Enter pet age"
                    />
                    {touched.age && errors.age && <Errors>{errors.age}</Errors>}
                    <PickerView>
                        <Picker
                            enabled={true}
                            value={values.gender}
                            mode="dropdown"
                            placeholder="Select Pet Type"
                            selectedValue={values.gender}
                            style={{ flex: 1, height: 50,fontSize:80,backgroundColor:"green'", borderRadius:20}}
                            onValueChange={(itemValue, itemIndex) =>{
                                handleChange('gender')(itemValue)
                            }}
                        >
                            <Picker.Item label="Select gender" value="" />
                            <Picker.Item label="Male" value="Male" />
                            <Picker.Item label="Female" value="Female" />
                        </Picker>
                    </PickerView>
                    {touched.gender && errors.gender && <Errors>{errors.gender}</Errors>}
                    <AddPetButton onPress={handleSubmit} type="submit">
                        <Text style={{color:"white"}}>Add</Text>
                    </AddPetButton>
                    <AddPetButton onPress={pickImage}>
                        <Text style={{color:"white"}}>Pick</Text>
                    </AddPetButton>
                </FormContainer>
            )}

        </Formik>


        </Container>
    )
}

const Container = styled.ScrollView`
    flex: 1;
`
const PickerView = styled.View`
    background-color: white;
  border-radius: 10px;
`
const FormContainer = styled.View`
  max-width: 90%;
  min-width: 90%;
    justify-content: center;
margin: auto;
`
const Input = styled.TextInput`
    width: 100%;
    height: 50px;
  padding: 0px 5px;
  font-size: 20px;
  background-color: white;
  margin: 10px auto;
  border-radius: 10px;
`
const AddPetButton = styled.TouchableOpacity`
    width:40%;
    height:40px;
  padding: 2px 5px;
    border-radius:10px;
    background-color: #00bfff;
    align-items:center;
    justify-content:center;
    margin: 10px auto;
  `
const Errors = styled.Text`
  align-self: flex-start;
    color: red;
  margin-left: 5px;
  `
export default AddPet;