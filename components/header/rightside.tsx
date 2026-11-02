import { colors, fonts } from "@/constants/theme";
import { useScrollContext } from "@/context/ScrollContext";
import { usePathname } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { RESUME_URL } from "../contact/getintouch";
import Link from "../layout/link";
import { useWindowWidth } from "../layout/usewidth";
import { MobileDropdown } from "./MobileDropdown";

type Item = { label: string; href: string };

const NAV_ITEMS: Item[] = [
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
  { label: "Resume", href: "/resume" },
];

// Drawn with Views instead of an icon font, so the page doesn't download a whole font for it.
function MenuIcon({ open }: { open: boolean }) {
  return (
    <View style={styles.icon}>
      {open ? (
        <>
          <View style={[styles.bar, styles.barCross, { transform: [{ rotate: "45deg" }] }]} />
          <View style={[styles.bar, styles.barCross, { transform: [{ rotate: "-45deg" }] }]} />
        </>
      ) : (
        <>
          <View style={styles.bar} />
          <View style={styles.bar} />
          <View style={styles.bar} />
        </>
      )}
    </View>
  );
}

export default function HeaderRight() {
  const pathname = usePathname();
  const width = useWindowWidth();
  const [modalVisible, setModalVisible] = useState(false);
  const isSmallScreen = width > 0 && width < 640; // desktop layout until the real width is known
  const buttonRef = useRef<View>(null);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, right: 0 });
  
  const scrollContext = useScrollContext();

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
        <View key={itemKey} style={[styles.link, inModal && styles.modalLink]}>
          <Link href={RESUME_URL} style={[styles.text, inModal && styles.modalText]}>
            {item.label}
          </Link>
        </View>
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
            <MenuIcon open={modalVisible} />
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
  icon: { width: 18, height: 14, justifyContent: "space-between" },
  bar: { height: 1.5, width: 18, backgroundColor: colors.text, borderRadius: 1 },
  barCross: { position: "absolute", top: 6 },
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