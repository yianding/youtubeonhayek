import React from 'react'
import { AutoColumn } from '../../components/Column';
import SaleOrderUnlockedCard from './saleOrderUnlockCard'
import SaleOrderLockedCard from './saleOrderLockedCard'
import ExecuteCard from './executeCard'
import { useGetMySaleOrderDataCallBack, useGetSellerDisputeBlockNumberCallBack } from '../../hooks/useApproveCallback'
import { LinkStyledButton } from '../../components/DescribeInputPanel';
import { useConditionOfOrders } from '../../state/conditionOfOrders/hooks';
import Card from '../../components/Card'
import Loader from '../../components/Loader';
import { useTranslation } from 'react-i18next';


export default function MySaleOrder() {

    const { t } = useTranslation()
    let orders = useGetMySaleOrderDataCallBack();
    let SellerDisputableBlockNumber = useGetSellerDisputeBlockNumberCallBack()
    let OrderNum = 0
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
            mySellOrderLineNumber: conditionOfOrders.mySellOrderLineNumber + 100,
            myBuyOrderLineNumber: conditionOfOrders.myBuyOrderLineNumber
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
                                <ExecuteCard key={k.id} pair={k} isSeller={true} />
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


                    {orders?.map((k) => {
                        if (k.state == 1) {
                            OrderNum++
                            return (
                                <SaleOrderLockedCard key={k.id} pair={k} SellerDisputableBlockNumber={SellerDisputableBlockNumber} />
                            )
                        } else { return }
                    }
                    )}


                    {orders ? <>{orders.map((k) => {
                        if (k.seller != "0x0000000000000000000000000000000000000000" && k.state == 0) {
                            OrderNum++
                            return (
                                <SaleOrderUnlockedCard key={k.id} pair={k} />
                            )
                        } else { return }
                    }
                    )}
                        {OrderNum == 0 ?
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
                        }</> : <></>
                    }

                </AutoColumn>
            </AutoColumn>


        </div>
    )
}