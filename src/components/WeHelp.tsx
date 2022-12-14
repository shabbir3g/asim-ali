import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Col, Container, Row } from 'react-bootstrap';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const WeHelp = () => {


    const [helps, setHelps] = useState([]);

    useEffect(() => {
      const client = new ApolloClient({
          uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
          cache: new InMemoryCache(),
        });
      client
      .query({
        query: gql`
        query{
            pages(where: {title: "home"}) {
              nodes {
                HomeLandingPage {
                  weHelpSection {
                    helpTitle
                    helpDescription
                    hideSection
                    helpImage {
                      mediaItemUrl
                    }
                  }
                }
              }
            }
          }`,
      })
      .then((result) => setHelps(result?.data?.pages?.nodes));
  }, []);

  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }


    return (
        <>
          
            
                {helps.map(help =>  
               
                {
                    return(
                <div 
               
                key={help?.HomeLandingPage?.weHelpSection}>

      {help?.HomeLandingPage?.weHelpSection?.hideSection == true ? "" : (
         <section className='wehelp_section'>
        <Container>
            <Row >
                       <Col lg={6} >
                           <div className="wehelp_image">
                            <video autoPlay loop style={{ width: '500px', height: '500px' }}>
                              {console.log('hello for you', help?.HomeLandingPage?.weHelpSection?.helpImage?.mediaItemUrl)}
                            <source src={help?.HomeLandingPage?.weHelpSection?.helpImage?.mediaItemUrl} />
                          </video>
                           {/* <Image 
                           loader={myLoader}
                           src={help?.HomeLandingPage?.weHelpSection?.helpImage?.sourceUrl}
                           width={500}
                           height={639}
                           alt={help?.HomeLandingPage?.weHelpSection?.helpImage?.altText} /> */}
                           </div>
                       </Col>
                       <Col lg={6} >
                          <div className="wehelp_text">
                               <h2 dangerouslySetInnerHTML={{__html: help?.HomeLandingPage?.weHelpSection?.helpTitle}} ></h2>
                           <p>{help?.HomeLandingPage?.weHelpSection?.helpDescription} 
                           {help?.helpImage?.sourceUrl}</p>
                           
                          </div>
                       </Col>
                   </Row>
        </Container>
        </section>
      )}
                    
                   </div> 
                   )
                }
                
                
                )}
                    
            
                
           
        </>
    );
};

export default WeHelp;