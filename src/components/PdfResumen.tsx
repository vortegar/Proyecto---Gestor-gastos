import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { PdfInterface } from '../interface/MonthInterface';
import { Expenses } from '../interface/ExpensesInterface';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#f9f9f9',
    padding: 30,
    fontFamily: 'Helvetica',
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
  heading: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#2c3e50',
    borderBottom: '1pt solid #ccc',
    paddingBottom: 6,
  },
  subtitle: {
    fontSize: 8,
    marginBottom: 12,
    color: '#555',
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
  },
  footer: {
    fontSize: 10,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 30,
    borderTop: '1pt solid #ddd',
    paddingTop: 10,
  },
});

const chunkArray = (array: Expenses[], size: number) =>
  Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );

export const PdfResumen: React.FC<PdfInterface> = ({
  monthActual,
  expenses,
  amountDiferenceUsers,
  diference,
  extraExpenses,
  resultDiference
}) => {
  const currentDate = new Date().toLocaleDateString('es-ES');
  const expenseChunks = expenses ? chunkArray(expenses, 25) : [];

  return (
    <Document>

      {/* 📄 Página 1 - Info general */}
      <Page size="A4" style={styles.page}>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.heading}>Detalle de pago del mes correspondiente a: {monthActual?.month || 'Mes no definido'}</Text>
          <Text style={styles.subtitle}>Este documento resume los gastos fijos, variables y deudas asociados al mes actual, incluyendo el balance entre usuarios.</Text>
        </View>

        {/* 🧾 Gastos Fijos */}
        <View style={styles.card}>
          <Text style={styles.heading}>Gastos Fijos - {monthActual?.month || 'Mes no definido'}</Text>
          {monthActual?.id !== undefined && monthActual?.fixed_expenses?.length > 0 ? (
            monthActual.fixed_expenses.map((gasto, i) => (
              <View key={i} style={styles.itemRow}>
                <Text style={styles.label}>{gasto?.spent_type}</Text>
                <Text style={styles.value}>${gasto?.total.toLocaleString('es-ES')}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyMessage}>No hay gastos fijos registrados para este mes.</Text>
          )}
        </View>

        {/* 👥 Diferencias entre usuarios */}
        <View style={styles.card}>
          <Text style={styles.heading}>Diferencia entre Usuarios</Text>
          <Text style={styles.subtitle}>Balance de lo que cada usuario ha gastado y cuánto debería compensar el otro.</Text>
          {amountDiferenceUsers && Object.keys(amountDiferenceUsers).length > 0 ? (
            <>
              {Object.entries(amountDiferenceUsers).map(([key, value], index) => (
                <View key={index} style={styles.itemRow}>
                  <Text style={styles.label}>{key}</Text>
                  <Text style={styles.value}>{value.toLocaleString('es-ES')}</Text>
                </View>
              ))}
              <View style={styles.itemRow}>
                <Text style={styles.label}>Pagar a: {resultDiference > 0 ? 'Victorio' : 'Andreina'}</Text>
                <Text style={styles.value}>{resultDiference.toLocaleString('es-ES')}</Text>
              </View>
            </>
          ) : (
            <Text style={styles.emptyMessage}>No hay datos</Text>
          )}
        </View>

        {/* 🧾 Deuda por pagar */}
        <View style={styles.card}>
          <Text style={styles.heading}>Deuda por Pagar</Text>
          <Text style={styles.subtitle}>Detalle de gastos adicionales pendientes de cubrir.</Text>
          {extraExpenses?.length > 0 ? (
            <>
              {extraExpenses.map((v, index) => (
                <View key={index} style={styles.itemRow}>
                  <Text style={styles.label}>{v.descripcion}</Text>
                  <Text style={styles.value}>{v.total.toLocaleString('es-ES')}</Text>
                </View>
              ))}
              <View style={styles.itemRow}>
                <Text style={styles.label}>Actualización de Deuda</Text>
                <Text style={styles.value}>{diference.toLocaleString('es-ES')}</Text>
              </View>
            </>
          ) : (
            <Text style={styles.emptyMessage}>No hay datos</Text>
          )}
        </View>

        <Text style={styles.footer}>Documento generado automáticamente el: {currentDate}</Text>
      </Page>

      {/* 📄 Páginas dinámicas para gastos variables */}
      {expenseChunks.length > 0 ? (
        expenseChunks.map((chunk, pageIndex) => (
          <Page key={pageIndex} size="A4" style={styles.page}>
            <View style={styles.card}>
              <Text style={styles.heading}>
                Gastos Variables - {monthActual?.month || 'Mes no definido'}
              </Text>
              <Text style={styles.subtitle}>Página {pageIndex + 1} de gastos variables.</Text>
              {chunk.map((gasto, i) => (
                <View key={i} style={styles.itemRow}>
                  <Text style={styles.label}>{gasto?.spent_type}</Text>
                  <Text style={styles.value}>${gasto?.monto}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.footer}>Documento generado el {currentDate} - Creado por Victorio Ortega</Text>
          </Page>
        ))
      ) : (
        <Page size="A4" style={styles.page}>
          <View style={styles.card}>
            <Text style={styles.heading}>Gastos Variables</Text>
            <Text style={styles.emptyMessage}>No hay gastos variables registrados para este mes.</Text>
          </View>
        </Page>
      )}

    </Document>
  );
};
