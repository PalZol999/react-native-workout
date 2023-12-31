import { View, Text, StyleSheet, FlatList, Pressable } from "react-native"
import {MontserratText} from "../components/styled/MontserratText"
import { NativeStackHeaderProps } from "@react-navigation/native-stack"
import WorkoutItem from "../components/WorkoutItem"
import { useWorkouts } from "../hooks/useWorkouts"


export default function HomeScreen({navigation}: NativeStackHeaderProps) {
const workouts= useWorkouts()

    return (
        <View style={stlyes.container}>
            <Text style={stlyes.header}>New Workouts</Text>
            <MontserratText>New Workouts</MontserratText>
            <FlatList 
            data={workouts}
            renderItem={({item}) => {
                return (
                    <Pressable
                    onPress={() => navigation.navigate("WorkoutDetail", {slug: item.slug})}
                    >
                    <WorkoutItem item={item}
                    />
                    </Pressable>
                )
            }}
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