import { create } from "zustand";
import { v4 as uuidv4 } from 'uuid';
import { persist } from "zustand/middleware";

export type FrequencyType = "daily" | "weekly"

export interface Habit {
    id: string
    name: string
    frequency: FrequencyType
    completedDates: string[]
    createdAt: string
}

export interface HabitState {
    habits: Habit[],
    addHabit: (name: string, frequency: FrequencyType) => void,
    removeHabit: (id: string) => void,
    toggleHabit: (id: string, date: string) => void
    // isLoading: boolean,
    // error: string | null
}

const useHabitStore = create<HabitState>()(
    persist(
        (set) => ({
            habits: [],
            addHabit: (name, frequency) => set((state) => {
                return {
                    habits: [...state.habits, { id: uuidv4(), name, frequency, completedDates: [], createdAt: new Date().toISOString() }]
                }
            }),
            removeHabit: (id) => set((state) => {
                return {
                    habits: state.habits.filter(habit => habit.id !== id)
                }
            }),
            toggleHabit: (id, date) => set((state) => {
                const habit = state.habits.find(h => h.id === id)

                if (habit) {
                    const index = habit.completedDates.indexOf(date)
                    if (index > -1) {
                        habit.completedDates.splice(index, 1)
                    } else {
                        habit.completedDates.push(date)
                    }
                }
                return {
                    habits: [...state.habits]
                }
            })

        }
        ),
        {
            name: "habit-storage"
        }
    )
)

export default useHabitStore