import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';

type InfoButtonProps = {
    onClick?: () => void
};

export default function InfoButton({ onClick }: InfoButtonProps) {
    return (
        <TouchableOpacity style={styles.button} onPress={onClick}>
            <View style={styles.circle}>
                <Text style={styles.iconText}>i</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
    },
    circle: {
        width: 15,
        height: 15,
        borderRadius: 7.5,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconText: {
        fontSize: 10, 
        fontWeight: 'bold',
        color: '#557F60',
        textShadowColor: 'rgba(0, 0, 0, 0.5)', 
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 1,
    },
});
