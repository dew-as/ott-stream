import React, { useState } from 'react';
import { Input, Button, Form, Row, Col, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (values) => {
    // Handle form submission logic
    if (values.password !== values.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Form submitted:', values);
  };

  return (
    <div className="container">
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col md={12}>
          <div className="card p-4 rounded">
            <Row gutter={16}>
              {/* Form Section */}
              <Col md={12}>
                <Title level={3} className="text-center mb-4">Register</Title>
                <Form onFinish={handleSubmit}>
                  <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please enter your name!' }]}>
                    <Input
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: 'Please enter your email!' },
                      { type: 'email', message: 'Please enter a valid email!' },
                    ]}>
                    <Input
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please enter your password!' }]}>
                    <Input.Password
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </Form.Item>
                  <Form.Item
                    name="confirmPassword"
                    rules={[
                      { required: true, message: 'Please confirm your password!' },
                    ]}>
                    <Input.Password
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-100">
                      Register
                    </Button>
                  </Form.Item>
                </Form>
                <Paragraph className="text-center">
                  Already have an account? <a href="/login">Login</a>
                </Paragraph>
              </Col>

              {/* Image Section */}
              <Col md={12} className="d-flex align-items-center justify-content-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  alt="Register"
                  className="img-fluid rounded"
                />
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
