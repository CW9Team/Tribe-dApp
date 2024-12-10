import React from 'react';
import './LandingPage.css';
import telegram from '../../images/landing-header-telegram.svg'
import logo from '../../images/logo.png';
import pancake from '../../images/pancake.png';
import bnb from '../../images/bnb.png';
import threeCharacters from '../../images/three_characters.png';
import Caveman from '../../images/tribe_personajes_caveman.png';
import CryptoKing from '../../images/tribe_personajes_king.png';
import Gladiator from '../../images/tribe_personajes_gladiador.png';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NftCardLandingPage from './NftCardLandingPage/NftCardLandingPage';
import CelebrityValidated from '../../images/celebrity_validated.png';
import OrganicGrowth from '../../images/organic_growth.png';
import CertifiedAuthenticity from '../../images/certified_authenticity.png';
import launchpadAllocation from '../../images/launchpad_allocation.png';
import stakingRewards from '../../images/staking_rewards.png';
import scheduledBurns from '../../images/scheduled_burns.png';
import { SiReddit, SiGithub } from "react-icons/si";
import { AiFillInstagram } from "react-icons/ai";



function LandingPage() {
  return (
    <div className='bg'>
      <div className="landing-page-wrapper">
        <div fluid className='main-container'>
          <Row>
            <Col lg={12} md={12} sm={12}>
              <div className='div-one'>
                <a href="https://t.me/tribebsc" target='_blank' rel='noreferrer'>
                  <div className=''>
                    <span> <img src={telegram} alt="Telegram" /> </span>
                    <span>Join the Tribe Telegram community.</span>
                  </div>
                </a>
              </div>
            </Col>
          </Row>
        </div>
        <div className='mt-5'>
          <div className='div-two'>
            <div className=''>
              <img src={logo} alt="logo" />
            </div>
            <Link to='/dashboard'>
              <div>
                <button>Enter Application</button>
              </div>
            </Link>
          </div>
        </div>
        <div className='mt-5'>
          <div className='div-three'>
            <Row>
              <Col lg={6} md={6}>
                <div className="div-three-one">
                  <div className="title">
                    <div className='title-launch'>
                      <div>We Launch Celebrities</div>
                    </div>
                  </div>
                  <p className="detail">
                    The first launchpad of Non-Fungible Tokens (NFTs) validated by
                    celebrities on the Binance Smart Chain (BSC).
                  </p>
                  <section className="button-container">
                    <button className="dashboard-buy-btn"
                      onClick={() => {
                        window.open('https://pancakeswap.finance/swap?outputCurrency=0xc34c85a3d7a84212b6234146773f7939a931a8af', '_blank').focus()
                      }}>
                      <img
                        src={pancake}
                        alt="pancake"
                        className="pancake-icon"
                      />
                      <strong>Buy on PancakeSwap</strong>
                    </button>



                    <Link to='/dashboard'>
                      <button className="dashboard-enter-btn">
                        <span>Enter Application</span>
                      </button>
                    </Link>
                  </section>
                  <section className="binance-smart">
                    <p className="text-1">Exclusively on</p>
                    <img
                      src={bnb}
                      alt="bnb"
                      className="bnb-icon"
                    />
                    <p className="text-2">Binance Smart Chain</p>
                  </section>
                </div>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <div className='div-three-2'>
                  <img src={threeCharacters} alt="Three Characters" />
                </div>
              </Col>
            </Row>
          </div>
        </div>
        {/* <div className='mt-5'>
          <div className="div-four">
            <h1 className="heading">Celebrity Non-Fungible Tokens (NFTs)</h1>
            <div className="div-four-items-main ">
              <Row>
                <div className="c-non-fungible-tokens">
                  <Col
                    lg={4}
                    md={6}
                    sm={6}
                  >
                    <div className="div-four-items-col">
                      <img
                        src={CelebrityValidated}
                        alt="icon"
                        className="icon"
                      />
                      <strong className="title">Celebrity Validated</strong>
                      <p className="info">
                        All TRIBE works are validated <br />
                        and in collaboration with <br />
                        the celebrity in question.
                      </p>
                    </div>
                  </Col>
                  <Col
                    lg={4}
                    md={6}
                    sm={6}
                  >
                    <div className="div-four-items-col">
                      <img
                        src={OrganicGrowth}
                        alt="icon"
                        className="icon"
                      />
                      <strong className="title">Organic Growth</strong>
                      <p className="info">
                        We get exponential growth by <br />
                        launching NFTs of celebrities <br />
                        that bring new communities to TRIBE.
                      </p>
                    </div>
                  </Col>
                  <Col
                    lg={4}
                    md={6}
                    sm={6}
                  >
                    <div className="div-four-items-col">
                      <img
                        src={CertifiedAuthenticity}
                        alt="icon"
                        className="icon"
                      />
                      <strong className="title">Certified Authenticity</strong>
                      <p className="info">
                        The transaction is an <br />
                        immutable certificate that proves that<br />
                        the work is genuine and authentic.
                      </p>
                    </div>
                  </Col>
                </div>
              </Row>
            </div>
          </div>
        </div> */}

        <div className="mt-5">
          <div className="div-eight">
            <section className="features">
              <h2 className="features__heading">Celebrity Non-Fungible Tokens (NFTs)</h2>
              <ul className="features__list">
                <li className="features__item">
                  <img
                    className="features__itemImage"
                    src={CelebrityValidated}
                    alt='img'
                  />
                  <h3 className="features__itemHeading">Celebrity Validated</h3>
                  <p className="features__itemText">
                    All TRIBE works are validated <br />
                    and in collaboration with <br />
                    the celebrity in question.
                  </p>
                </li>
                <li className="features__item">
                  <img
                    className="features__itemImage"
                    src={OrganicGrowth}
                    alt='img'
                  />
                  <h3 className="features__itemHeading">Organic Growth</h3>
                  <p className="features__itemText">
                    We get exponential growth by <br />
                    launching NFTs of celebrities <br />
                    that bring new communities to TRIBE.
                  </p>
                </li>
                <li className="features__item">
                  <img
                    className="features__itemImage"
                    src={CertifiedAuthenticity}
                    alt='img'
                  />
                  <h3 className="features__itemHeading">Certified Authenticity</h3>
                  <p className="features__itemText">
                    The transaction is an <br />
                    immutable certificate that proves that<br />
                    the work is genuine and authentic.
                  </p>
                </li>
              </ul>
            </section>
          </div>
        </div>


        <div className='mt-5'>
          <div className="div-five">
            <h2 className="features__heading mb-5">Latest NFTs released</h2>
            <Container>
              <Row>
                <Col lg={3} md={6} sm={12}>
                  <div className="div-five-inner-col-1">
                    <NftCardLandingPage launchBanner='' launchIcon='' title='Coming Soon' subTitle='Coming Soon' status={false} />
                  </div>
                </Col>
                <Col lg={3} md={6} sm={12}>
                  <div className="div-five-inner-col-1">
                    <NftCardLandingPage launchBanner='' launchIcon='' title='Coming Soon' subTitle='Coming Soon' status={false} />
                  </div>
                </Col>
                <Col lg={3} md={6} sm={12}>
                  <div className="div-five-inner-col-1">
                    <NftCardLandingPage launchBanner='' launchIcon='' title='Coming Soon' subTitle='Coming Soon' status={false} />
                  </div>
                </Col>
                <Col lg={3} md={6} sm={12}>
                  <div className="div-five-inner-col-1">
                    <NftCardLandingPage launchBanner='' launchIcon='' title='Coming Soon' subTitle='Coming Soon' status={false} />
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        <div className="mt-5">
          <div className="div-eight">
            <section className="features">
              <h2 className="features__heading">Why you should own $TRIBEX Tokens</h2>
              <ul className="features__list">
                <li className="features__item">
                  <img
                    className="features__itemImage"
                    src={launchpadAllocation}
                    alt='img'
                  />
                  <h3 className="features__itemHeading">Launchpad Allocations</h3>
                  <p className="features__itemText">
                    Our three-tier program contemplates and weights the support of our community.
                  </p>
                </li>
                <li className="features__item">
                  <img
                    className="features__itemImage"
                    src={stakingRewards}
                    alt='img'
                  />
                  <h3 className="features__itemHeading">Staking Rewards</h3>
                  <p className="features__itemText">
                    Our stake pools seek to be one of the most profitable in the Binance Smart Chain (BSC).
                  </p>
                </li>
                <li className="features__item">
                  <img
                    className="features__itemImage"
                    src={scheduledBurns}
                    alt='img'
                  />
                  <h3 className="features__itemHeading">Scheduled Burns</h3>
                  <p className="features__itemText">
                    A large percentage of TRIBE's net profits will go to buyback and burn $TRIBEX tokens.
                  </p>
                </li>
              </ul>
            </section>
          </div>
        </div>
        <div className="mt-5">
          <div className="div-eleven">
            <section className="allocation">
              <h2 className="allocation__heading">Allocation Program</h2>
              <ul className="allocation__list">
                <li className="allocation__item">
                  <img
                    src={Caveman}
                    alt='img'
                    className="allocation__image"
                  />
                  <h3 className="allocation__name">Caveman</h3>
                  <div className="allocation__row">
                    <span className="allocation__label">Access to level 1 NFTs</span>
                  </div>
                  <div className="allocation__row">
                    <span className="allocation__label cgray">Required Staked Tokens</span>
                    <span className="allocation__value">2.500 $TRIBEX</span>
                  </div>
                  <div className="allocation__row">
                    <span className="allocation__label cgray">Odds Ratios</span>
                    <span className="allocation__value">5 out of 10</span>
                  </div>
                </li>
                <li className="allocation__item">
                  <img
                    src={Gladiator}
                    alt='img'
                    className="allocation__image"
                  />
                  <h3 className="allocation__name">Gladiator</h3>
                  <div className="allocation__row">
                    <span className="allocation__label">Access to level 2 NFTs</span>
                  </div>
                  <div className="allocation__row">
                    <span className="allocation__label cgray">Required Staked Tokens</span>
                    <span className="allocation__value">17.500 $TRIBEX</span>
                  </div>
                  <div className="allocation__row">
                    <span className="allocation__label cgray">Odds Ratios</span>
                    <span className="allocation__value">7 out of 10</span>
                  </div>
                </li>
                <li className="allocation__item">
                  <img
                    src={CryptoKing}
                    alt='img'
                    className="allocation__image"
                  />
                  <h3 className="allocation__name">CryptoKing</h3>
                  <div className="allocation__row">
                    <span className="allocation__label">Access to Exclusive NFTs</span>
                  </div>
                  <div className="allocation__row">
                    <span className="allocation__label cgray">Required Staked Tokens</span>
                    <span className="allocation__value">50.000 $TRIBEX</span>
                  </div>
                  <div className="allocation__row">
                    <span className="allocation__label cgray">Odds Ratios</span>
                    <span className="allocation__value">Guarenteed Allocation</span>
                  </div>
                </li>
              </ul>
            </section>
          </div>
        </div>
        <div className="mt-5">
          <div className="div-twelve">
            <div className="apply-container">
              <div className="div-twelve-main">
                <div className='apply-information'>
                  <section className="apply-content">
                    <strong className="heading">Apply for your NFT on TRIBE</strong>
                    <p className="description">
                      Send us your contact information <br />
                      as well as your celebrity profile and <br />
                      we will contact you as soon as possible
                    </p>
                    <div className="button-container">
                      <a
                        className="btn-apply"
                        href="https://docs.google.com/forms/d/e/1FAIpQLSd5-yZ3SW1vFCNzapMdUqkCIMtjh_dqOBdko9zlFV7e2uCq2g/viewform"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <strong className="label">Apply Now</strong>
                      </a>
                      <a
                        className="btn-contact"
                        href="https://t.me/tribebsc"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <strong className="label">Contact Us</strong>
                      </a>
                    </div>
                  </section>
                </div>
                <div className='media-no-dis'>
                  <div className="apply-information">
                    <img className='div-twelve-three-char' src={threeCharacters} alt="Three Characters" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        <div className="mt-5">
          <div className="div-last">
            <div className="sc-gtsrHT gfuSqG">
              <div className="footer-container">
                <div className="div-last-main">
                  <div className="logo-container">
                    <a href="/">
                      <img
                        src={logo}
                        alt="logo"
                        className="logo"
                      />
                    </a>
                  </div>

                  <div className="social-button">
                    <a href="https://t.me/tribebsc" target="_blank" rel="noreferrer">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="footer-social-icons">
                        <g id="_1" data-name={1}>
                          <path
                            className="cls-1"
                            d="M9.4,15v3.66a.35.35,0,0,0,.61.23l2.52-2.81,5.14,4.67a.49.49,0,0,0,.81-.26L22,4A.71.71,0,0,0,21,3.14L2.31,10.36a.48.48,0,0,0,0,.9L6.44,13a1.28,1.28,0,0,0,1.2-.1L18.88,5.62,9.81,14.09A1.28,1.28,0,0,0,9.4,15Z"
                          />
                        </g>
                      </svg>
                    </a>
                    <a href="https://twitter.com/tribebsc" target="_blank" rel="noreferrer">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="footer-social-icons">
                        <g id="_1" data-name={1}>
                          <path
                            id="cls-1"
                            d="M22,5.8a8.6,8.6,0,0,1-2.36.65,4.07,4.07,0,0,0,1.8-2.27,8.1,8.1,0,0,1-2.6,1A4.1,4.1,0,0,0,11.75,8a4.73,4.73,0,0,0,.09.93A11.6,11.6,0,0,1,3.39,4.62,4.2,4.2,0,0,0,2.83,6.7a4.09,4.09,0,0,0,1.82,3.4A4,4,0,0,1,2.8,9.6v0a4.11,4.11,0,0,0,3.29,4A4.2,4.2,0,0,1,5,13.81a4,4,0,0,1-.78-.07,4.14,4.14,0,0,0,3.83,2.85A8.22,8.22,0,0,1,3,18.34a6.37,6.37,0,0,1-1-.06,11.48,11.48,0,0,0,6.29,1.84A11.58,11.58,0,0,0,20,8.46c0-.18,0-.36,0-.53A8.31,8.31,0,0,0,22,5.8Z"
                          />
                        </g>
                      </svg>
                    </a>
                    <a href="https://instagram.com/tribebsc" target="_blank" rel="noreferrer" className="footer-social-icons ft-i-insta">
                      <AiFillInstagram />
                    </a>
                    <a href="https://reddit.com/r/tribebsc" target="_blank" rel="noreferrer" className="footer-social-icons">
                      <SiReddit />
                    </a>

                    <a href="https://github.com/TribeBSC" target="_blank" rel="noreferrer" className="footer-social-icons">
                      <SiGithub />
                    </a>
                    <a href="https://bscscan.com/token/0xc34c85a3d7a84212b6234146773f7939a931a8af" target="_blank" rel="noreferrer">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="footer-social-icons">
                        <g id="_1" data-name={1}>
                          <path
                            className="cls-1"
                            d="M5.74,17.55V10.82a.56.56,0,0,1,.56-.55H8.56a.56.56,0,0,1,.56.55v6.11l1-.24V9a.56.56,0,0,1,.55-.56h2.27a.56.56,0,0,1,.55.56v6.63c.42-.16.83-.34,1.24-.52v-8a.56.56,0,0,1,.56-.55h2.26a.56.56,0,0,1,.56.55V13.2a13.93,13.93,0,0,0,3.58-3.64A10,10,0,0,0,2,12a9.88,9.88,0,0,0,1.84,5.76C4.38,17.71,5,17.65,5.74,17.55Z"
                          />
                          <path
                            className="cls-1"
                            d="M6.76,20.5A9.84,9.84,0,0,0,12,22,10,10,0,0,0,22,12c0-.26,0-.53,0-.78C20.52,14.32,16.72,18.49,6.76,20.5Z"
                          />
                        </g>
                      </svg>
                    </a>
                    <a href="https://pancakeswap.finance/swap?outputCurrency=0xc34c85a3d7a84212b6234146773f7939a931a8af" target="_blank" rel="noreferrer">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="footer-social-icons">
                        <g id="_1" data-name={1}>
                          <path
                            className="cls-1"
                            d="M17.61,8.77,18.27,5a2.62,2.62,0,0,0-.5-2,2.64,2.64,0,0,0-1.85-1h-.21a2.59,2.59,0,0,0-2.59,2.59V7.7c-.37,0-.75,0-1.12,0s-.79,0-1.19,0V4.56A2.6,2.6,0,0,0,8.21,2H8A2.61,2.61,0,0,0,5.65,5L6.32,8.8C3.6,10,2,12,2,14.12v1.46C2,19.2,6.39,22,12,22s10-2.83,10-6.45V14.12C22,11.93,20.37,10,17.61,8.77Zm-1.9-6h0Zm-.28,9.61c.56,0,1,.68,1,1.52s-.45,1.51-1,1.51-1-.68-1-1.51S14.87,12.33,15.43,12.33ZM8.21,2.72h0Zm.23,9.61c.56,0,1,.68,1,1.52s-.45,1.51-1,1.51-1-.68-1-1.51S7.88,12.33,8.44,12.33Zm12.81,3.25c0,3.15-4.14,5.7-9.25,5.7s-9.25-2.55-9.25-5.7V14.12h0c0,3.14,4.15,5.69,9.25,5.69s9.24-2.55,9.25-5.69h0Z"
                          />
                        </g>
                      </svg>
                    </a>
                  </div>
                </div>
                <div
                  className="divider"
                  role="separator"
                />
                <div>
                  <div className="copyright-text ">
                    <span>Copyright © 2021. All Rights Reserved.</span>
                    <span>Developed by<a href="" target='_blank' rel='noreferrer'> Tribe Dev Team.</a></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage;