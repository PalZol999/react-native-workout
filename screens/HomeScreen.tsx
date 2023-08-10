import { View, Text, StyleSheet, FlatList } from "react-native"
import {MontserratText} from "../components/styled/MontserratText"
import data from '../data.json'
import { NativeStackHeaderProps } from "@react-navigation/native-stack"
import { Workout } from "../types/data"
import WorkoutItem from "../components/WorkoutItem"

export default function HomeScreen({navigation}: NativeStackHeaderProps) {

    return (
        <View style={stlyes.container}>
            <Text style={stlyes.header}>New Workouts</Text>
            <MontserratText>New Workouts</MontserratText>
            <FlatList 
            data={data as Array<Workout>}
            renderItem={WorkoutItem}
            keyExtractor={item => item.slug}

            />
        </View>
    )
        }

        const stlyes = StyleSheet.create({
            container: {
                padding:20,
                flex: 1
            },
            header: {
                fontSize: 20,
                marginBottom: 20,
                fontWeight: "bold",
        
            }
})