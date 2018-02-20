import React from 'react'
import { StyleSheet, Text, View, PanResponder } from 'react-native'

export default class App extends React.Component {
  state = {
    top: 0,
    left: 0,
    topTransition: 0,
    leftTransition: 0,
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => {
        return true
      },
      onPanResponderMove: (e, gestureState) => {
        const { dy, dx } = gestureState

        this.setState({
          topTransition: dy,
          leftTransition: dx,
        })
      },
      onPanResponderEnd: (e, gestureState) => {
        const { top, left } = this.state
        const { dy, dx } = gestureState

        this.setState({
          top: top + dy,
          left: left + dx,
          topTransition: 0,
          leftTransition: 0,
        })
      }
    })
  }

  render() {
    const { top, left, topTransition, leftTransition } = this.state
    const style = {
      top: top + topTransition,
      left: left + leftTransition,
    }

    return (
      <View
        {...this.panResponder.panHandlers}
        style={[styles.box, style]}
      >
        <Text>DRAG ME</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    backgroundColor: 'salmon',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
