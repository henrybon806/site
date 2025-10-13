import React, { useRef, useEffect } from "react";
import { View, Text, Image, StyleSheet, ImageSourcePropType, Animated, Easing } from "react-native";

type Props = { 
  image: ImageSourcePropType; 
  caption: string; 
  title?: string; 
};

export default function AwardPhotoHighlight({ 
    title = "Recognized for Outstanding Leadership", 
    image, 
    caption 
}: Props) {
    
    const glowAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(glowAnim, {
                    toValue: 1,
                    duration: 4000, // Slow, long pulse
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(glowAnim, {
                    toValue: 0,
                    duration: 4000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [glowAnim]);

    const shadowOpacity = glowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.05, 0.20],
    });
    
    const shadowRadius = glowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [8, 12],
    });

    const borderColor = glowAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['#E0E0E0', '#B0B0B0'],
    });

    return (
        <View style={styles.wrap}>
            <Text style={styles.title}>{title}</Text>
            
            <Animated.View style={[
                styles.frame, 
                { 
                    borderColor: borderColor,
                    shadowOpacity: shadowOpacity,
                    shadowRadius: shadowRadius,
                }
            ]}>
                <Image source={image} style={styles.img} resizeMode="cover" />
                
                <View style={styles.imageOverlay} />
            </Animated.View>
            
            <Text style={styles.captionBody}>{caption}</Text>
        </View>
    );
}

// ---
// Styles
// ---

const styles = StyleSheet.create({
    wrap: {
        marginTop: 40,
        alignItems: "center",
        gap: 16,
        paddingHorizontal: 16,
    },
    title: { 
        fontSize: 26, 
        fontWeight: "900", 
        color: "#111827",
        textTransform: 'uppercase', 
        letterSpacing: 0.5,
    },
    frame: {
        width: "100%",
        maxWidth: 640, 
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 14, 
        borderWidth: 2,
        position: 'relative', 
        // Static shadow properties (opacity/radius/color are animated)
        shadowColor: "#C0C0C0", 
        shadowOffset: { width: 0, height: 6 },
        elevation: 6,
    },
    img: { 
        width: "100%", 
        height: 380, 
        borderRadius: 12,
    },
    imageOverlay: {
        position: 'absolute',
        top: 14, // Matches padding of frame
        left: 14,
        right: 14,
        bottom: 14,
        borderRadius: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.05)', // Very slight dark overlay for depth
        zIndex: 1, // Sits above the image but under text (if text were on the image)
    },
    captionHeader: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1F2937',
        marginTop: 8,
    },
    captionBody: { 
        fontSize: 14, 
        color: "#4B5563",
        textAlign: 'center',
        maxWidth: 500,
        lineHeight: 22,
    },
});