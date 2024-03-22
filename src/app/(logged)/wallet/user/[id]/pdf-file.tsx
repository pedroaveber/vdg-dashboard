// type PDFFileProps = {}
'use client'

import {
  Page,
  Document,
  StyleSheet,
  View,
  Text,
  Image,
} from '@react-pdf/renderer'
import VozesDoGigantePng from '@/assets/img/VozesDoGiganteLogo.png'
import { format } from 'date-fns'

const mockUser = {
  id: 1,
  name: 'Pedro Alberto Veber Berna',
  email: 'pedro.veber@outlook.com',
  avatarUrl: 'http://github.com/pedroalbertoveber.png',
  transactions: [
    {
      id: Math.random(),
      amount: 100,
      createdAt: new Date(),
    },
    {
      id: Math.random(),
      amount: 100,
      createdAt: new Date(),
    },
    {
      id: Math.random(),
      amount: 100,
      createdAt: new Date(),
    },
    {
      id: Math.random(),
      amount: 100,
      createdAt: new Date(),
    },
    {
      id: Math.random(),
      amount: 100,
      createdAt: new Date(),
    },
    {
      id: Math.random(),
      amount: 100,
      createdAt: new Date(),
    },
    {
      id: Math.random(),
      amount: 100,
      createdAt: new Date(),
    },
    {
      id: Math.random(),
      amount: 100,
      createdAt: new Date(),
    },
    {
      id: Math.random(),
      amount: 100,
      createdAt: new Date(),
    },
    {
      id: Math.random(),
      amount: 100,
      createdAt: new Date(),
    },
    {
      id: Math.random(),
      amount: 100,
      createdAt: new Date(),
    },
    {
      id: Math.random(),
      amount: 100,
      createdAt: new Date(),
    },
    {
      id: Math.random(),
      amount: 100,
      createdAt: new Date(),
    },
    {
      id: Math.random(),
      amount: 100,
      createdAt: new Date(),
    },
    {
      id: Math.random(),
      amount: 100,
      createdAt: new Date(),
    },
    {
      id: Math.random(),
      amount: 100,
      createdAt: new Date(),
    },
    {
      id: Math.random(),
      amount: 100,
      createdAt: new Date(),
    },
    {
      id: Math.random(),
      amount: 100,
      createdAt: new Date(),
    },
    {
      id: Math.random(),
      amount: 100,
      createdAt: new Date(),
    },
    {
      id: Math.random(),
      amount: 100,
      createdAt: new Date(),
    },
    {
      id: Math.random(),
      amount: 100,
      createdAt: new Date(),
    },
  ],
}

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function PDFFile() {
  return (
    <Document>
      <Page size={'A4'} style={styles.background}>
        <View style={styles.headerContainer}>
          {/* <Image src={VozesDoGigantePng} /> */}
          <Text style={styles.heading}>Vozes do Gigante</Text>

          <Text style={styles.smallText}>
            {format(new Date(), 'dd/MM/yyyy hh:mm')}
          </Text>
        </View>

        <View style={styles.userInfoContainer}>
          <View style={styles.userNameAndEmailContainer}>
            <Text style={styles.text}>Pedro Alberto Veber Berna</Text>
            <Text style={styles.smallText}>pedro.veber@outlook.com</Text>
          </View>
        </View>

        <Text style={styles.heading}>Informações da Wallet</Text>

        <View style={styles.tableHeading}>
          <View style={styles.tableHeadingRow}>
            <Text style={styles.text}>Data da transação</Text>
          </View>

          <View style={styles.tableHeadingRow}>
            <Text style={styles.text}>Tipo de movimentação</Text>
          </View>

          <View style={styles.tableHeadingRow}>
            <Text style={styles.text}>Valor da transação</Text>
          </View>
        </View>

        {mockUser.transactions.map((transaction) => (
          <View key={transaction.id} style={styles.tableHeading}>
            <View style={styles.tableHeadingRow}>
              <Text style={styles.text}>
                {format(transaction.createdAt, 'dd/MM/yyyy')}
              </Text>
            </View>

            <View style={styles.tableHeadingRow}>
              <Text style={styles.text}>
                {transaction.amount > 0 ? 'ENTRADA' : 'SAIDA'}
              </Text>
            </View>

            <View style={styles.tableHeadingRow}>
              <Text style={styles.text}>
                {currencyFormatter.format(transaction.amount)}
              </Text>
            </View>
          </View>
        ))}
      </Page>
    </Document>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  headerContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
  },
  smallText: {
    fontSize: 12,
    color: 'gray',
  },
  userInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 12,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginBottom: 12,
  },
  userNameAndEmailContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
  },
  tableHeading: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  tableHeadingRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    borderBottomStyle: 'dashed',
    paddingVertical: 4,
    width: '33.33%',
  },
})
