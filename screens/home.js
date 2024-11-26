import React from 'react';
import { Image, ScrollView, View, Button, StyleSheet, Text } from 'react-native';

const HomeScreen = ({ navigation, route }) => {
    const { deletedCount } = route.params || { deletedCount: 0 };
    const rocketHeight = 150 + (deletedCount * 50);

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.bgWrapper}>
                <Image source={require("../assets/spaceBG.png")} style={styles.skyLayer} />
                <Image source={require("../assets/skyBG.png")} style={styles.skyLayer} />
                <Image source={require("../assets/skyBG.png")} style={styles.skyLayer} />
                <Image source={require("../assets/forestBG.jpg")} style={styles.forestLayer} />
            </View>

            <View style={styles.logoWrapper}>
                <Text style={styles.logoText}>LifeSync</Text>
            </View>

            <View style={[styles.rocketWrapper, { bottom: 50 }]}>
                <Image source={require("../assets/rocket.png")} style={[styles.rocketImage, { height: rocketHeight }]} />
            </View>

            <View style={styles.buttonWrapper}>
                <Button title="Calendar" onPress={() => navigation.navigate("Calendar")} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
    },
    bgWrapper: {
        width: '100%',
        position: 'relative',
    },
    skyLayer: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    forestLayer: {
        width: '100%',
        height: 600,
        resizeMode: 'cover',
    },
    logoWrapper: {
        position: 'absolute',
        top: '40%',
        width: '100%',
        alignItems: 'center',
        zIndex: 2,
    },
    logoText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    rocketWrapper: {
        position: 'absolute',
        left: 0,
        width: '100%',
        alignItems: 'center',
        zIndex: 1,
    },
    rocketImage: {
        width: 150,
        resizeMode: 'contain',
    },
    buttonWrapper: {
        marginTop: 20,
        alignItems: 'center',
    },
});

export default HomeScreen;