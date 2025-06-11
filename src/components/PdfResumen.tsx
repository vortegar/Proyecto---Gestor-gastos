import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PdfInterface } from '../interface/MonthInterface';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#f9f9f9',
    padding: 30,
    fontFamily: 'Helvetica'
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 20,
    border: '1pt solid #ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 20,
  },
  section: {
    marginBottom: 12,
  },
  heading: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#2c3e50',
    borderBottom: '1pt solid #ccc',
    paddingBottom: 6,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555',
  },
  value: {
    fontSize: 12,
    color: '#222',
  },
  emptyMessage: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#999',
  }
});

export const PdfResumen: React.FC<PdfInterface> = ({ monthActual, expenses }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.card}>
          <Text style={styles.heading}>
            Gastos Fijos - {monthActual?.month || 'Mes no definido'}
          </Text>
          {monthActual?.id !== undefined && monthActual?.fixed_expenses?.length > 0 ? (
            monthActual.fixed_expenses.map((gasto, i) => (
              <View key={i} style={styles.itemRow}>
                <Text style={styles.label}>{gasto?.spent_type}</Text>
                <Text style={styles.value}>${gasto?.total}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyMessage}>
              No hay gastos fijos registrados para este mes.
            </Text>
          )}
        </View>
        <View style={styles.card}>
          <Text style={styles.heading}>
            Gastos Variables - {monthActual?.month || 'Mes no definido'}
          </Text>
          {monthActual?.id !== undefined && expenses?.length > 0 ? (
            expenses.map((gasto, i) => (
              <View key={i} style={styles.itemRow}>
                <Text style={styles.label}>{gasto?.spent_type}</Text>
                <Text style={styles.value}>${gasto?.monto}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyMessage}>
              No hay gastos variables registrados para este mes.
            </Text>
          )}
        </View>
      </Page>
    </Document>
  );
};
