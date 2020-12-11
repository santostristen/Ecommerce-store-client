import React from 'react'
import { Button, Row, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Account = ({ user }) => {
  return (
    <Container>
      <Row>
        <h2 className="col-12">{user.email}&apos;s account</h2>
        <Link to="/purchases"><Button style={{ backgroundColor: '#F2CB05' }}>See purchases</Button></Link>
      </Row>
    </Container>
  )
}

export default Account
