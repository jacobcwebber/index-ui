import React, { useCallback } from 'react'

import {
  Box,
  Button,
  ModalActions,
  ModalContent,
  ModalProps,
  ModalTitle,
  Separator,
  Spacer,
} from 'react-neu'
import { toast } from 'react-toastify'

import styled from 'styled-components'

import bedBorderLogo from 'assets/bed-border.png'
import dataLogo from 'assets/data-logo.png'
import gmiLogo from 'assets/gmilogo.png'
import indexToken from 'assets/index-token.png'
import Modal from 'components/CustomModal'
import FancyValue from 'components/FancyValue'
import Split from 'components/Split'
import * as tokenAddresses from 'constants/ethContractAddresses'
import { dpiTokenImage } from 'constants/productTokens'
import useBalances from 'hooks/useBalances'
import useWallet from 'hooks/useWallet'
import { displayFromWei, getBigNumber } from 'utils'
import { MAINNET_CHAIN_DATA, POLYGON_CHAIN_DATA } from 'utils/connectors'

const WalletModal: React.FC<ModalProps> = ({ isOpen, onDismiss }) => {
  const { reset, chainId } = useWallet()
  const {
    indexBalance,
    dpiBalance,
    dpiBalancePolygon,
    mviBalance,
    mviBalancePolygon,
    ethfliBalance,
    ethflipBalance,
    btcfliBalance,
    bedBalance,
    dataBalance,
    gmiBalance,
    uniswapEthDpiLpBalance,
    uniswapEthMviLpBalance,
    stakedUniswapEthDpiLpBalance,
    stakedFarmTwoBalance,
    stakedUniswapEthMviLpBalance,
    dataBalancePolygon,
    gmiBalancePolygon,
    stakedGmiBalance,
  } = useBalances()

  const totalStakedEthDpiLpBalance = getBigNumber(
    stakedUniswapEthDpiLpBalance
  ).plus(getBigNumber(stakedFarmTwoBalance))

  const handleSignOut = useCallback(() => {
    reset()
    toast.success("You've successfully signed out.")
    onDismiss && onDismiss()
  }, [reset, onDismiss])

  const ethMviTokenIcon = (
    <StyledLpTokenWrapper>
      <StyledLpTokenImage
        alt='ETH Icon'
        src='https://s3.amazonaws.com/set-core/img/coin-icons/eth.svg'
      />
      <StyledLpTokenImage
        alt='MVI Icon'
        src='https://set-core.s3.amazonaws.com/img/portfolios/mvi.svg'
      />
    </StyledLpTokenWrapper>
  )

  const ethDpiTokenIcon = (
    <StyledLpTokenWrapper>
      <StyledLpTokenImage
        alt='ETH Icon'
        src='https://s3.amazonaws.com/set-core/img/coin-icons/eth.svg'
      />
      <StyledLpTokenImage alt='DPI Icon' src={dpiTokenImage} />
    </StyledLpTokenWrapper>
  )

  const getChainName = () => {
    if (chainId === MAINNET_CHAIN_DATA.chainId)
      return `My ${MAINNET_CHAIN_DATA.name} Wallet`
    if (chainId === POLYGON_CHAIN_DATA.chainId)
      return `My ${POLYGON_CHAIN_DATA.name} Wallet`
    return 'My Wallet'
  }

  const mainnetModalContent = () => {
    return (
      <>
        <Split>
          <Box row>
            <FancyValue
              icon={{
                src: indexToken,
                alt: 'Index token',
              }}
              link={`https://etherscan.io/address/${tokenAddresses.indexTokenAddress}`}
              label='INDEX balance'
              value={displayFromWei(indexBalance)}
            />
          </Box>
          <Box row>
            <FancyValue
              icon={{
                alt: 'Defi Pulse Icon',
                src: dpiTokenImage,
              }}
              label='DPI balance'
              link={`https://etherscan.io/address/${tokenAddresses.dpiTokenAddress}`}
              value={displayFromWei(dpiBalance)}
            />
          </Box>
        </Split>
        <Spacer />
        <Split>
          <Box row>
            <FancyValue
              icon={{
                alt: 'BED Icon',
                src: bedBorderLogo,
              }}
              label='BED Index Balance'
              link={`https://etherscan.io/address/${tokenAddresses.bedTokenAddress}`}
              value={displayFromWei(bedBalance)}
            />
          </Box>
          <Box row>
            <FancyValue
              icon={{
                alt: 'MVI Icon',
                src: 'https://set-core.s3.amazonaws.com/img/portfolios/mvi.svg',
              }}
              label='Metaverse Index Balance'
              link={`https://etherscan.io/address/${tokenAddresses.mviTokenAddress}`}
              value={displayFromWei(mviBalance)}
            />
          </Box>
        </Split>
        <Spacer />
        <Split>
          <Box row>
            <FancyValue
              icon={{
                alt: 'DATA Icon',
                src: dataLogo,
              }}
              label='DATA Economy Index Balance'
              link={`https://etherscan.io/address/${tokenAddresses.dataTokenAddress}`}
              value={displayFromWei(dataBalance)}
            />
          </Box>
          <Box row>
            <FancyValue
              icon={{
                alt: 'GMI Icon',
                src: gmiLogo,
              }}
              label='Bankless DeFi Innovation Index Balance'
              link={`https://etherscan.io/address/${tokenAddresses.gmiTokenAddress}`}
              value={displayFromWei(gmiBalance)}
            />
          </Box>
        </Split>
        <Spacer />
        <Separator />
        <Spacer />
        <Split>
          <Box row>
            <FancyValue
              icon={{
                alt: 'ETH2x-FLI Icon',
                src: 'https://set-core.s3.amazonaws.com/img/portfolios/eth2x_fli.svg',
              }}
              label='ETH 2x FLI Balance'
              link={`https://etherscan.io/address/${tokenAddresses.eth2xfliTokenAddress}`}
              value={displayFromWei(ethfliBalance)}
            />
          </Box>
          <Box row>
            <FancyValue
              icon={{
                alt: 'BTC2x-FLI Icon',
                src: 'https://set-core.s3.amazonaws.com/img/portfolios/fli_btc.svg',
              }}
              label='BTC 2x FLI Balance'
              link={`https://etherscan.io/address/${tokenAddresses.btc2xfliTokenAddress}`}
              value={displayFromWei(btcfliBalance)}
            />
          </Box>
        </Split>
        <Spacer />
        <Separator />
        <Spacer />
        <Split>
          <Box row>
            <FancyValue
              iconComponent={ethDpiTokenIcon}
              label='Uniswap ETH/DPI LP balance'
              link={`https://etherscan.io/address/${tokenAddresses.uniswapEthDpiLpTokenAddress}`}
              value={displayFromWei(uniswapEthDpiLpBalance)}
            />
          </Box>
          <Box row>
            <FancyValue
              icon={{
                alt: 'Staked Uniswap ETH/DPI LP Icon',
                src: 'https://set-core.s3.amazonaws.com/img/coin-icons/uni_lp.svg',
              }}
              label='Staked Uniswap ETH/DPI LP'
              link={`https://etherscan.io/address/${tokenAddresses.farmTwoAddress}`}
              value={displayFromWei(totalStakedEthDpiLpBalance)}
            />
          </Box>
        </Split>
        <Spacer />
        <Split>
          <Box row>
            <FancyValue
              iconComponent={ethMviTokenIcon}
              label='Uniswap ETH/MVI LP balance'
              link={`https://etherscan.io/address/${tokenAddresses.uniswapEthMviLpTokenAddress}`}
              value={displayFromWei(uniswapEthMviLpBalance)}
            />
          </Box>
          <Box row>
            <FancyValue
              icon={{
                alt: 'Staked Uniswap ETH/MVI LP Icon',
                src: 'https://set-core.s3.amazonaws.com/img/coin-icons/uni_lp.svg',
              }}
              label='Staked Uniswap ETH/MVI LP'
              link={`https://etherscan.io/address/${tokenAddresses.mviStakingRewardsAddress}`}
              value={displayFromWei(stakedUniswapEthMviLpBalance)}
            />
          </Box>
        </Split>
        <Spacer />
        <Split>
          <Spacer />
          <Box row>
            <FancyValue
              icon={{
                alt: 'Staked GMI Icon',
                src: gmiLogo,
              }}
              label='Staked GMI'
              link={`https://etherscan.io/address/${tokenAddresses.gmiTokenAddress}`}
              value={displayFromWei(stakedGmiBalance)}
            />
          </Box>
        </Split>
      </>
    )
  }

  const polygonModalContent = () => {
    return (
      <>
        <Split>
          <Box row>
            <FancyValue
              icon={{
                alt: 'Defi Pulse Icon',
                src: dpiTokenImage,
              }}
              label='DPI balance (Polygon)'
              link={`https://polygonscan.com/address/${tokenAddresses.dpiTokenPolygonAddress}`}
              value={displayFromWei(dpiBalancePolygon)}
            />
          </Box>
          <Box row>
            <FancyValue
              icon={{
                alt: 'MVI Icon',
                src: 'https://set-core.s3.amazonaws.com/img/portfolios/mvi.svg',
              }}
              label='Metaverse Index Balance (Polygon)'
              link={`https://polygonscan.com/address/${tokenAddresses.mviTokenPolygonAddress}`}
              value={displayFromWei(mviBalancePolygon)}
            />
          </Box>
        </Split>
        <Spacer />
        <Separator />
        <Spacer />
        <Split>
          <Box row>
            <FancyValue
              icon={{
                alt: 'ETH2x-FLI-P Icon',
                src: 'https://set-core.s3.amazonaws.com/img/portfolios/eth2x_fli.svg',
              }}
              label='ETH 2x FLI-P Balance'
              link={`https://polygonscan.com/address/${tokenAddresses.eth2xflipTokenAddress}`}
              value={displayFromWei(ethflipBalance)}
            />
          </Box>
          <Box row>
            <FancyValue
              icon={{
                alt: 'DATA Icon',
                src: dataLogo,
              }}
              label='DATA Economy Index Balance (Polygon)'
              link={`https://polygonscan.com/address/${tokenAddresses.dataTokenPolygonAddress}`}
              value={displayFromWei(dataBalancePolygon)}
            />
          </Box>
        </Split>
        <Spacer />
        <Split>
          <Box row>
            <FancyValue
              icon={{
                alt: 'GMI Icon',
                src: gmiLogo,
              }}
              label='Bankless DeFi Innovation Index Balance (Polygon)'
              link={`https://polygonscan.com/address/${tokenAddresses.gmiTokenPolygonAddress}`}
              value={displayFromWei(gmiBalancePolygon)}
            />
          </Box>
          <Spacer />
        </Split>
      </>
    )
  }

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss}>
      <StyledModalBody>
        <ModalTitle text={getChainName()} />
        <ModalContent>
          {chainId && chainId === MAINNET_CHAIN_DATA.chainId
            ? mainnetModalContent()
            : polygonModalContent()}
        </ModalContent>
        <Separator />
        <ModalActions>
          <Button onClick={onDismiss} text='Close' variant='secondary' />
          <Button onClick={handleSignOut} text='Sign Out' />
        </ModalActions>
      </StyledModalBody>
    </Modal>
  )
}

const StyledLpTokenImage = styled.img`
  height: 30px;
  margin-left: -10px;
`

const StyledLpTokenWrapper = styled.div``

const StyledModalBody = styled.div`
  @media (max-width: 600px) {
    height: 100vh;
    overflow-y: scroll;
  }
`

export default WalletModal
