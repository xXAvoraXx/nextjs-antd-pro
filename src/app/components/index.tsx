'use client';
import { PageContainer } from '@ant-design/pro-components';
import { Card, theme, Typography } from 'antd';
import React from 'react';

const { Title, Text, Paragraph } = Typography;

/**
 * Each individual card, extracted as a component for reusability
 * @param param0
 * @returns
 */
const InfoCard: React.FC<{
  title: string;
  index: number;
  desc: string;
  href: string;
}> = ({ title, href, index, desc }) => {
  const { useToken } = theme;

  const { token } = useToken();

  return (
    <div
      style={{
        backgroundColor: token.colorBgContainer,
        boxShadow: token.boxShadow,
        borderRadius: '8px',
        //fontSize: '14px',
        color: token.colorTextSecondary,
        lineHeight: '22px',
        padding: '16px 19px',
        minWidth: '220px',
        flex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            lineHeight: '22px',
            backgroundSize: '100%',
            textAlign: 'center',
            padding: '8px 16px 16px 12px',
            color: '#FFF',
            fontWeight: 'bold',
            backgroundImage:
              "url('https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg')",
          }}
        >
          {index}
        </div>
        <div
          style={{
            //fontSize: '16px',
            color: token.colorText,
            paddingBottom: 8,
          }}
        >
          <Title level={5}>{title}</Title>
        </div>
      </div>
      <div
        style={{
          //fontSize: '14px',
          color: token.colorTextSecondary,
          textAlign: 'justify',
          lineHeight: '22px',
          marginBottom: 8,
        }}
      >
        <Paragraph>{desc}</Paragraph>
      </div>

      <Text>
        <a href={href} target="_blank" rel="noreferrer">
          For more information {'>'}
        </a>
      </Text>
    </div>
  );
};

const WelcomePageContainer: React.FC = () => {
  const { token } = theme.useToken();
  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
        }}
      >
        <div
          style={{
            backgroundPosition: '100% -30%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '274px auto',
            backgroundImage:
              "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
          }}
        >
          <div
            style={{
              //fontSize: '20px',
              color: token.colorTextHeading,
            }}
          >
            <Title level={3}>Welcome to Ant Design Pro</Title>
          </div>
          <Paragraph
            style={{
              //fontSize: '14px',
              color: token.colorTextSecondary,
              lineHeight: '22px',
              marginTop: 16,
              marginBottom: 32,
              width: '65%',
            }}
          >
            Welcome to Ant Design Pro. Ant Design Pro is a scaffold solution that integrates umi,
            Ant Design, and ProComponents. It is dedicated to improving the experience of &ldquo;users&rdquo;
            and &ldquo;designers&rdquo; in the process of designing and developing enterprise-level middle and
            back-office products by building the foundation of design features and basic components,
            improving typical templates/business components/supporting design resources.
          </Paragraph>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <InfoCard
              index={1}
              href="https://umijs.org/docs/introduce/introduce"
              title="Understanding Umi"
              desc="umi is an extensible enterprise-level front-end application framework. umi is based on routing and supports both structured routing and traditionally routed routes, making routing fully functional and extensible with this functionality."
            />
            <InfoCard
              index={2}
              title="Understanding Ant Design"
              href="https://ant.design"
              desc="antd is a React UI component library based on the Ant Design design system, mainly used to develop enterprise-level middle and back-end products."
            />
            <InfoCard
              index={3}
              title="Understanding Pro Components"
              href="https://procomponents.ant.design"
              desc="ProComponents is based on Ant Design to make a higher abstraction of template components, a component is a page for the development of the concept, providing a better experience for middle and back-end development."
            />
          </div>
        </div>
      </Card>
    </PageContainer>
  );
};

export default WelcomePageContainer;
