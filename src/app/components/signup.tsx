import React from 'react'
import { Button } from '@nextui-org/button';

const Signup = () => {
  return (
<Button
            color="primary"
            size="sm"
            onPress={() => {
              window.location.href = 'https://signup.steemit.com/#source=condenser|user_index';
            }}
          >
            Sign up
          </Button>
  )
}

export default Signup