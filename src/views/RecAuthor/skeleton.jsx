import React, { useState } from 'react'
import { Skeleton, Row, Col, Divider  } from 'antd'
import style from './index.module.scss'
export default function RecAuthorSkeleton() {
    let [ items ] = useState(new Array(6).fill(0))
    return <div className={style['skeleton']}>
                {
                    items.map(i => {
                        return <div className={style['skeleton-item']}>
                                    <Row>
                                        <Col span={10}></Col>
                                        <Col span={14}>
                                            <Skeleton.Avatar active={true} shape={'circle'} />
                                        </Col>
                                    </Row>
                                    <Divider />
                                    <Row><Skeleton active={true} paragraph={{ rows: 4 }} /></Row>
                                </div>
                    })
                }
            </div>
}