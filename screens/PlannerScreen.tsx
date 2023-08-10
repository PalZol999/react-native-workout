import { View, Text, Button } from "react-native"
import { useEffect } from "react"
import { NativeStackHeaderProps } from "@react-navigation/native-stack"

export default function PlannerScreen({navigation}: NativeStackHeaderProps) {

    useEffect(() =>{
        console.log("Rendering Plannerscreeen")

    }, [])
    return (
        <View>
        <Text>I'm the Planner Screen</Text>
        <Button 
            onPress={() => navigation.navigate("Home")}
            title="Go to Home"/>
        </View>
    )
}