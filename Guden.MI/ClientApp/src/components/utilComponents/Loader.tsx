import React from 'react'
import { Dimmer,  Image, Segment } from 'semantic-ui-react'

const Loader = () => (
  <Segment>
    <Dimmer active>
      <Loader />
    </Dimmer>

    <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
  </Segment>
)

export default Loader
