import { Button } from "react-native";

interface CustomButtonProps {
    title: string;
    onPress: () => void;
};


export default function CustomButton({ title, onPress }: CustomButtonProps) {
    return (
        <Button
            title={title}
            onPress={onPress}
        />
    )
};