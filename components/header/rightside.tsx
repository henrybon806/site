import { colors, fonts } from "@/constants/theme";
import { useScrollContext } from "@/context/ScrollContext";
import { Ionicons } from "@expo/vector-icons";
import { usePathname } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Linking, Platform, Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { MobileDropdown } from "./MobileDropdown";

type Item = { label: string; href: string };

const NAV_ITEMS: Item[] = [
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
  { label: "Resume", href: "/resume" },
];

export default function HeaderRight() {
  const pathname = usePathname();
  const { width } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const isSmallScreen = width < 640; // Threshold for mobile view
  const buttonRef = useRef<View>(null);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, right: 0 });
  
  let scrollContext: ReturnType<typeof useScrollContext> | undefined;
  try {
    scrollContext = useScrollContext();
  } catch {
    scrollContext = undefined;
  }

  const isMainPage = pathname === "/";
  
  useEffect(() => {
    if (!isSmallScreen) return;
    
    const updateButtonPosition = () => {
      if (Platform.OS === 'web' && buttonRef.current) {
        // @ts-ignore - This is valid in web but TypeScript doesn't know about it
        const rect = buttonRef.current.getBoundingClientRect?.();
        if (rect) {
          setButtonPosition({
            top: rect.bottom,
            right: window.innerWidth - rect.right
          });
        }
      }
    };
    
    updateButtonPosition();
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateButtonPosition);
      return () => window.removeEventListener('resize', updateButtonPosition);
    }
  }, [isSmallScreen]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      // We only handle this in web context
      if (typeof document === 'undefined') return;
      
      // Skip if the dropdown is already closed
      if (!modalVisible) return;
      
      // We check if the click was inside the dropdown container
      const isOutsideClick = !(event.target.closest('[data-dropdown-container="true"]'));
      
      if (isOutsideClick) {
        setModalVisible(false);
      }
    };

    if (typeof document !== 'undefined') {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [modalVisible]);

  // Navigation item renderer function
  const renderNavItem = (item: Item, inModal = false) => {
    const active =
      pathname === item.href ||
      (item.href !== "/" && pathname?.startsWith(item.href));
      
    // Add a key to ensure React can track items properly
    const itemKey = inModal ? `dropdown-${item.label}` : item.label;
    
    if (isMainPage && scrollContext && item.label !== "Resume") {
      return (
        <Pressable
          key={itemKey}
          style={({ pressed }) => [
            styles.link,
            inModal && styles.modalLink,
            pressed && styles.pressed
          ]}
          onPress={() => {
            scrollContext?.scrollToSection(item.label);
            if (inModal) setModalVisible(false);
          }}
          accessibilityRole="button"
          accessibilityLabel={`Scroll to ${item.label}`}
        >
          <Text style={[
            styles.text, 
            inModal && styles.modalText,
            active && styles.active
          ]}>
            {item.label}
          </Text>
        </Pressable>
      );
    }

    if (item.label === "Resume") {
      return (
        <Pressable
          key={itemKey}
          style={({ pressed }) => [
            styles.link, 
            inModal && styles.modalLink,
            pressed && styles.pressed
          ]}
          onPress={() => { 
            Linking.openURL("https://resume.henrybonomolo.com")
          }}
          accessibilityRole="link"
          accessibilityLabel={`Go to ${item.label}`}
        >
          <Text style={[
            styles.text, 
            inModal && styles.modalText,
            active && styles.active
          ]}>
            {item.label}
          </Text>
        </Pressable>
      );
    }
    return (
      <Pressable
        key={itemKey}
        style={({ pressed }) => [
          styles.link, 
          inModal && styles.modalLink,
          pressed && styles.pressed
        ]}
        onPress={() => {
          if (inModal) setModalVisible(false);
        }}
        accessibilityRole="button"
        accessibilityLabel={`Scroll to ${item.label}`}
      >
        <Text style={[
          styles.text, 
          inModal && styles.modalText,
          active && styles.active
        ]}>
          {item.label}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {isSmallScreen ? (
        <View 
          ref={buttonRef}
          style={styles.dropdownContainer}
          data-dropdown-container="true" // For click outside detection
        >
          <Pressable
            style={({ pressed }) => [
              styles.hamburgerButton, 
              pressed && styles.pressed,
              
            ]}
            onPress={(e) => {
              e.stopPropagation(); // Prevent immediate closing
              setModalVisible(!modalVisible);
            }}
            accessibilityLabel="Toggle navigation menu"
          >
            <Ionicons name={modalVisible ? "close" : "menu"} size={20} color={colors.text} />
          </Pressable>
          
          {/* Use our specialized MobileDropdown component for web */}
          {Platform.OS === 'web' && (
            <MobileDropdown
              isVisible={modalVisible}
              buttonPosition={buttonPosition}
              content={
                <>
                  {NAV_ITEMS.map((item) => (
                    <div key={`dropdown-${item.label}`} style={{ marginBottom: 4 }}>
                      {renderNavItem(item, true)}
                    </div>
                  ))}
                </>
              }
            />
          )}
          
          {/* Fallback for native platforms */}
          {Platform.OS !== 'web' && modalVisible && (
            <View 
              style={[
                styles.dropdownMenu,
                {
                  top: 40,
                  right: 0,
                }
              ]}
              data-dropdown-container="true"
            >
              <View style={styles.dropdownContent}>
                {NAV_ITEMS.map((item) => renderNavItem(item, true))}
              </View>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.row}>
          {NAV_ITEMS.map((item) => renderNavItem(item))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  link: {
    paddingVertical: 6,
  },
  text: {
    fontFamily: fonts.mono,
    fontSize: 12,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: colors.muted,
  },
  active: {
    color: colors.text,
  },
  pressed: {
    opacity: 0.8,
  },
  hamburgerButton: {
    padding: 4,
  },
  dropdownContainer: {
    position: "relative",
    zIndex: 9999,
  },
  dropdownMenu: {
    position: "fixed",
    top: 20, // Position below the hamburger button with some extra space
    right: 20, // Add some margin from the right edge
    borderRadius: 8,
    padding: 12, // Increased padding
    minWidth: 100, // Slightly wider
  },
  modalLink: {
    paddingVertical: 10,
    paddingHorizontal: 5, // Increased horizontal padding
    width: "100%",
    // backgroundColor: "#fff",
    marginBottom: 4, // Add space between items
  },
  modalText: {
    fontSize: 13,
    color: colors.text,
  },
  dropdownContent: {
    position: "relative",
    zIndex: 2,
  },
});