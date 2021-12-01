import React from 'react'
import { AutoColumn } from '../../components/Column';
import BuyOrderCard from './buyOrderCard';
import ExecuteCard from './executeCard';
import { useGetBuyerDisputeBlockNumberCallBack, useGetMyBuyOrderDataCallBack } from '../../hooks/useApproveCallback'
import { LinkStyledButton } from '../../components/DescribeInputPanel';
import { useConditionOfOrders } from '../../state/conditionOfOrders/hooks';
import Loader from '../../components/Loader';
import Card from '../../components/Card'
import { useTranslation } from 'react-i18next';

export default function MyBuyOrder() {

    const { t } = useTranslation()
    let orders = useGetMyBuyOrderDataCallBack()
    let BuyerDisputableBlockNumber = useGetBuyerDisputeBlockNumberCallBack()
    let OrderNum=0
    const [conditionOfOrders, setconditionOfOrders] = useConditionOfOrders()
    const handleMore = () => {
        let a = {
            quantity_min: conditionOfOrders.quantity_min,
            quanity_max: conditionOfOrders.quanity_max,
            price_min: conditionOfOrders.price_min,
            price_max: conditionOfOrders.price_max,
            currency: conditionOfOrders.currency,
            erc20: conditionOfOrders.erc20,
            sellerDeposit: conditionOfOrders.sellerDeposit,
            buyerDeposit: conditionOfOrders.buyerDeposit,
            linenumber: conditionOfOrders.linenumber,
            mySellOrderLineNumber: conditionOfOrders.mySellOrderLineNumber,
            myBuyOrderLineNumber: conditionOfOrders.myBuyOrderLineNumber + 100
        }
        setconditionOfOrders(a);
    }
    return (
        <div>
            <AutoColumn gap="lg" justify="center">
                <AutoColumn gap="6px" style={{ width: '100%' }}>
                    {orders ? orders.map((k) => {
                        if (k.state == 3) {
                            OrderNum++
                            return (
                                <ExecuteCard key={k.id} pair={k} isSeller={false} />
                            )
                        } else { return }
                    }
                    ) :
                        <Card >
                            <AutoColumn gap="12px">
                                <div style={{ textAlign: "center" }}>
                                    <Loader></Loader>
                                </div>
                            </AutoColumn>
                        </Card >}


                    {orders?<>{orders.map((k) => {
                    
                        if (k.state == 1) {
                            OrderNum++
                            return (
                                <BuyOrderCard key={k.id} pair={k} BuyerDisputableBlockNumber={BuyerDisputableBlockNumber}
                                />
                            )
                        } else { return }
                    }
                    )}
                    {OrderNum==0?
                    <>
                      <Card >
                      <AutoColumn gap="12px">
                        <div style={{ textAlign: "center" }}>
                          {t("No qualified order at present")}
                        </div>
                      </AutoColumn>
                    </Card >
                    </>
                    :
                    <div style={{ textAlign: "center" }}>
                        <LinkStyledButton onClick={handleMore} >{t("More")}</LinkStyledButton>
                    </div>
                    }</>:<></>
                    }
                </AutoColumn>
            </AutoColumn>

        </div>
    )
}