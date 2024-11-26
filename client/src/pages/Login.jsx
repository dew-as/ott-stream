import React, { useState } from 'react';
import { Input, Button, Form, Row, Col, Typography } from 'antd';
import axiosConfig from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (values) => {
    // Handle form submission logic
    try {
      const response = await axiosConfig.post('/login', formData)
      console.log(response)
      navigate('/movies')
    } catch (error) {
      // console.log(error.response.data.error);
      console.log(error);
      
    }
  };

  return (
    <div className="container">
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col md={12}>
          <div className="card p-4 rounded">
            <Row gutter={16}>
              {/* Login Form Section (Left side) */}
              <Col md={12}>
                <Title level={3} className="text-center mb-4">Login</Title>
                <Form onFinish={handleSubmit}>
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
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="w-100">
                      Login
                    </Button>
                  </Form.Item>
                </Form>
                <Paragraph className="text-center">
                  Don't have an account? <a href="/register">Sign up</a>
                </Paragraph>
              </Col>

              {/* Image Section (Right side) */}
              <Col md={12} className="d-flex align-items-center justify-content-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  alt="Login"
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

export default Login;
