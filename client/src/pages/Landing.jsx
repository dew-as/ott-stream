import React, { useEffect } from 'react';
import { Button, Card, Row, Col, Typography } from 'antd';
import { UserAddOutlined, LoginOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useSearchParams } from 'react-router-dom';
import axiosConfig from '../axiosConfig';

const { Title, Paragraph } = Typography;

const Landing = () => {
  const [searchParams] = useSearchParams();
  const logout = searchParams.get('logout');

  useEffect(() => {
    const handleLogout = async () => {
      try {
        if (logout) {
          const response = await axiosConfig.post('/logout')
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    }
    handleLogout()
  }, [logout])

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Row justify="center" align="middle" className="w-100">
        <Col xs={24} sm={18} md={12} lg={8}>
          <Card
            cover={
              <img
                alt="landing-image"
                src="https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAAQW3WfYl7ALJAUWQpuN4KwzCIw6eDszKBJAzvcQ65YG9NxtJvA1lZoBV9IQD4rKYz4qb3b1LL2tVdl65M2DaU17AH586Q88c4Mt0NXQaGRbz-bFly17fj3VsSyDQQjY5VmgR1eagljAMs5XRFPnbatwbx.jpg?r=b6f"
                className="img-fluid rounded-top"
              />
            }
            hoverable
            className='border-warning'
          >
            <div className="text-center p-3">
              <Title level={2} className="text-warning mb-3">
                Welcome to Our App
              </Title>
              <Paragraph className="text-muted mb-4">
                Discover a better way to manage your tasks and projects with our easy-to-use platform.
                Join us today to get started!
              </Paragraph>

              <div className="d-grid gap-2">
                <Link to={'/login'}>
                  <Button
                    icon={<LoginOutlined />}
                    size="large"
                    block
                    className="mb-2 btn btn-warning"
                  >
                    Login
                  </Button>
                </Link>
                <Link to={'/register'}>
                  <Button
                    icon={<UserAddOutlined />}
                    size="large"
                    block
                  >
                    Register
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Landing;
