// BottomSheet.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';

const BottomSheet = ({ isVisible, onClose, options, colors }) => {
  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.fullScreenContainer} onPress={onClose}>
        <View style={styles.bottomSheet}>
          {options.map((option, index) => (
            <TouchableOpacity 
              key={index} 
              onPress={option.onPress} 
              style={index > 0 ? styles.optionButton : null}
            >
              <Text style={[styles.optionText, option.danger && { color: colors.danger }]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  fullScreenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  optionButton: {
    marginTop: 10,
  },
  optionText: {
    textAlign: 'center',
  }
});

export default BottomSheet;
