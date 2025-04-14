import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Link from "next/link";
import Simple from '@/components/base/Simple';
import Image from 'next/image';

const UpcommingTwo = () => {
   return (
      <div className="project__wrapper">
         <div className="row g-4">
            <div className="col-lg-4 col-md-6">
               <div className="project__item project__item--upcomming1">
                  <div className="project__item-inner">
                     <div className="project__item-thumb">
                        <Image src="/images/igo/item/03.jpg" 
                           width={500}
                           height={500}
                           alt="IGO cover" />
                        <span className="badge">
                           <Image src="/images/chain/binance.png"
                              width={35}
                              height={35}
                              alt="chain logo" />
                        </span>
                     </div>
                     <div className="project__item-content">
                        <div className="project__item-top">
                           <div className="project__item-author">
                              <Link href="#">
                                 <Image src="/images/igo/author/2.png"
                                    width={80}
                                    height={80}
                                    alt="author image" />
                              </Link>
                              <h4>Cyber Car</h4>
                           </div>
                        </div>
                        <div className="project__item-middle">
                           <div className="project__item-amount">
                              <p>Raised Ammount</p>
                              <h6><span className="color--theme-color">5000</span> / <span>15000
                                 BUSD</span>
                              </h6>
                              <div className="progress">
                                 <div className="progress-bar" role="progressbar" style={{ width: "25%" }}
                                    aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                           </div>
                        </div>
                        <div className="project__item-bottom">
                           <Link href="project-details.html" className="default-btn default-btn--small">View
                              Details</Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="col-lg-4 col-md-6">
               <div className="project__item project__item--upcomming1">
                  <div className="project__item-inner">
                     <div className="project__item-thumb">
                        <Image src="/images/igo/item/04.jpg" 
                           width={500}
                           height={500}
                           alt="IGO cover" />
                        <span className="badge">
                           <Image src="/images/chain/eth.png"
                              width={35}
                              height={35}
                              alt="chain logo" />
                        </span>
                     </div>
                     <div className="project__item-content">
                        <div className="project__item-top">
                           <div className="project__item-author">
                              <Link href="#">
                                 <Image src="/images/igo/author/3.png"
                                    width={80}
                                    height={80}
                                    alt="author image" />
                              </Link>
                              <h4>Cyber Car</h4>
                           </div>
                        </div>
                        <div className="project__item-middle">
                           <div className="project__item-amount">
                              <p>Raised Ammount</p>
                              <h6><span className="color--theme-color">5000</span> / <span>15000
                                 BUSD</span>
                              </h6>
                              <div className="progress">
                                 <div className="progress-bar" role="progressbar" style={{ width: "55%" }}
                                    aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                           </div>
                        </div>
                        <div className="project__item-bottom">
                           <Link href="project-details.html" className="default-btn default-btn--small">View
                              Details</Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="col-lg-4 col-md-6">
               <div className="project__item project__item--upcomming1">
                  <div className="project__item-inner">
                     <div className="project__item-thumb">
                        <Image src="/images/igo/item/05.jpg" 
                           width={500}
                           height={500}
                           alt="IGO cover" />
                        <span className="badge">
                           <Image src="/images/chain/binance.png"
                              width={35}
                              height={35}
                              alt="chain logo" />
                        </span>
                     </div>
                     <div className="project__item-content">
                        <div className="project__item-top">
                           <div className="project__item-author">
                              <Link href="#">
                                 <Image src="/images/igo/author/4.png"
                                    width={80}
                                    height={80}
                                    alt="author image" />
                              </Link>
                              <h4>Cyber Car</h4>
                           </div>
                        </div>
                        <div className="project__item-middle">
                           <div className="project__item-amount">
                              <p>Raised Ammount</p>
                              <h6><span className="color--theme-color">5000</span> / <span>15000
                                 BUSD</span>
                              </h6>
                              <div className="progress">
                                 <div className="progress-bar" role="progressbar" style={{ width: "75%" }}
                                    aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                           </div>
                        </div>
                        <div className="project__item-bottom">
                           <Link href="project-details.html" className="default-btn default-btn--small">View
                              Details</Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default UpcommingTwo;