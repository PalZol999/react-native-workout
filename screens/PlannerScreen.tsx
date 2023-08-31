import { View, StyleSheet, FlatList, Text } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

import ExerciseFrom, { ExerciseFormData } from "../components/ExerciseForm";
import { SequenceItem, SequenceType, Workout } from "../types/data";
import slugify from "slugify";
import { useState } from "react";
import ExerciseItem from "../components/ExerciseItem";
import { PressableText } from "../components/styled/PressableText";
import { ModalM } from "../components/styled/Modal";
import WorkoutForm, { WorkoutFormData } from "../components/workoutForm";
import { storeWorkout } from "../storage/workout";

export default function PlannerScreen({ navigation }: NativeStackHeaderProps) {
  const [seqItems, setSeqItems] = useState<SequenceItem[]>([]);

  const handleFormSubmit = (form: ExerciseFormData) => {
    const sequenceItem: SequenceItem = {
      slug: slugify(form.name + " " + Date.now(), { lower: true }),
      name: form.name,
      type: form.type as SequenceType,
      duration: Number(form.duration),
    };

    if (form.reps) {
      sequenceItem.reps = Number(form.reps);
    }
    setSeqItems([...seqItems, sequenceItem]);
  };
  const compDiff = (exercisesCount: number, workoutDuration: number) => {
    const intensity = workoutDuration / exercisesCount;
    if (intensity <= 60) {
      return "hard";
    } else if (intensity <= 100) {
      return "normal";
    } else {
      return "easy";
    }
  };

  const handleWorkoutSubmit = async (form: WorkoutFormData) => {
    if (seqItems.length > 0) {

      const duration = seqItems.reduce((acc, item) => {
        return acc + item.duration;
      }, 0)

      const workout: Workout = {
        name: form.name,
        slug: slugify(form.name + " " + Date.now(), {lower: true}),
        difficulty: compDiff(seqItems.length, duration),
        sequence: [...seqItems],
        duration,
      }

      await storeWorkout(workout);
    }

  }
  return (
    <View style={styles.container}>
      <FlatList
        data={seqItems}
        renderItem={({ item, index }) => (
          <ExerciseItem item={item}>
            <PressableText
              text="Remove"
              onPress={() => {
                const items = [...seqItems];
                items.splice(index, 1);
                setSeqItems(items);
              }}
            />
          </ExerciseItem>
        )}
        keyExtractor={(item) => item.slug}
      />
      <ExerciseFrom onSubmit={handleFormSubmit} />
      <View>
        <ModalM
          activator={({ handleOpen }) => (
            <PressableText
              style={{ marginTop: 15 }}
              text="Create workout"
              onPress={handleOpen}
            />
          )}
        >
          {({ handleClose }) => (
            <View>
            <WorkoutForm
              onSubmit={async (data) => {
                await handleWorkoutSubmit(data);
                handleClose();
                navigation.navigate("Home");
              }}
            />
          </View>
          )}
        </ModalM>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fex: 1,
    padding: 20,
  },
});
