/*import React from 'react';
import { Image, ScrollView, Text, ImageBackground, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation, route }) => {
    return (
        <ScrollView ref={ref => { this.scrollView = ref }} onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })}>
            <Image source={require("../assets/skyBG.png")} style={styles.bgImage} />
            <Image source={require("../assets/skyBG.png")} style={styles.bgImage} />
            <Image source={require("../assets/forestBG.jpg")} style={styles.bgImage} />
            <Image source={require("../assets/bamboo.png")} style={styles.bgImage} />
            <Button title="Calendar" onPress={() => navigation.navigate("Calendar")} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    bgImageWrapper: {
        position: 'absolute',
        top: 0, bottom: 0, left: 0, right: 0
    },
    bgImage: {
        flex: 1,
        resizeMode: "stretch"
    },
    fgImage: {
        flex: 1,
        elevation: 2
    },
});

export default HomeScreen;*/

import React from 'react';
import { Image, ScrollView, View, ImageBackground, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <ScrollView>
            {/* Stack skyBG and forestBG vertically */}
            <View>
                <Image source={require("../assets/skyBG.png")} style={styles.bgLayer} />
                <Image source={require("../assets/forestBG.jpg")} style={styles.bgLayer} />
            </View>

            {/* Overlay bamboo image */}
            <View style={styles.overlayWrapper}>
                <Image source={require("../assets/bamboo.png")} style={styles.overlayImage} />
            </View>

            <Button title="Calendar" onPress={() => navigation.navigate("Calendar")} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    bgLayer: {
        width: '100%',
        height: 500, // Adjust based on your desired height for each background image
        resizeMode: 'cover',
    },
    overlayWrapper: {
        position: 'absolute',
        top: '40%', // Adjust this value to control where the bamboo image appears
        left: '50%',
        transform: [{ translateX: -100 }, { translateY: 400 }],
        zIndex: 1, // Ensure the bamboo image is above the scrollable backgrounds
    },
    overlayImage: {
        width: 200, // Adjust bamboo image size
        height: 200,
        resizeMode: 'contain',
    },
});

export default HomeScreen;
