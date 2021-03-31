// export default class ExampleOne extends Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
//         tableData: [
//           ['1', '2', '3', '4'],
//           ['a', 'b', 'c', 'd'],
//           ['1', '2', '3', '456\n789'],
//           ['a', 'b', 'c', 'd']
//         ]
//       }
//     }

//     render() {
//       const state = this.state;
//       return (

//         <Container style={{ width: '100%' }}>
//             <Header />
//             <Content contentContainerStyle={{ flex: 1 }}>
//                 <Text
//                     style={{
//                         textAlign: 'center',
//                         paddingBottom: 20,
//                         fontSize: 30,
//                     }}
//                 >
//                     HOME PAGE GOES HERE
//                 </Text>
//                 <Image
//                     source={{
//                         uri:
//                             'https://ahseeit.com//king-include/uploads/2021/01/131361232_212624293657437_6119095336913972420_n-5194714820.jpg',
//                     }}
//                     style={{
//                         width: 400,
//                         height: 400,
//                     }}
//                 />
//             </Content>
//             <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
//                 <Row
//                     data={state.tableHead}
//                     style={styles.head}
//                     textStyle={styles.text}
//                 />
//                 <Rows data={state.tableData} textStyle={styles.text} />
//             </Table>
//             <FooterTabs />
//         </Container>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//         paddingTop: 30,
//         backgroundColor: '#fff',
//     },
//     head: { height: 40, backgroundColor: '#f1f8ff' },
//     text: { margin: 6 },
// });

// export default Dashboard;

// // export default class ExampleOne extends Component {
// //     constructor(props) {
// //         super(props);
// //         this.state = {
// //             tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
// //             tableData: [
// //                 ['1', '2', '3', '4'],
// //                 ['a', 'b', 'c', 'd'],
// //                 ['1', '2', '3', '456\n789'],
// //                 ['a', 'b', 'c', 'd'],
// //             ],
// //         };
// //     }
// // }
// import React, { Component } from 'react';
// import { StyleSheet, View } from 'react-native';
// import {
//     Table,
//     TableWrapper,
//     Row,
//     Rows,
//     Col,
// } from 'react-native-table-component';

import React, { Component } from 'react';
import { Text, Image, StyleSheet, View } from 'react-native';
import { Container, Content } from 'native-base';
import FooterTabs from '../components/navigation/FooterTabs';
import Header from '../components/Header';
import {
    Table,
    TableWrapper,
    Row,
    Rows,
    Col,
} from 'react-native-table-component';

export default class ExampleTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['', 'Head1', 'Head2', 'Head3'],
            tableTitle: ['Title', 'Title2', 'Title3', 'Title4'],
            tableData: [
                ['1', '2', '3'],
                ['a', 'b', 'c'],
                ['1', '2', '3'],
                ['a', 'b', 'c'],
            ],
        };
    }

    render() {
        const state = this.state;
        return (
            <Container style={{ width: '100%' }}>
                <Header />
                <Content
                    style={styles.container}
                    contentContainerStyle={{ flex: 1 }}
                >
                    <Text
                        style={{
                            textAlign: 'center',
                            paddingBottom: 20,
                            fontSize: 30,
                        }}
                    >
                        Hi, {this.props.user.username}
                    </Text>
                    <Table borderStyle={{ borderWidth: 1 }}>
                        <Row
                            data={state.tableHead}
                            flexArr={[1, 2, 1, 1]}
                            style={styles.head}
                            textStyle={styles.text}
                        />
                        <TableWrapper style={styles.wrapper}>
                            <Col
                                data={state.tableTitle}
                                style={styles.title}
                                heightArr={[28, 28]}
                                textStyle={styles.text}
                            />
                            <Rows
                                data={state.tableData}
                                flexArr={[2, 1, 1]}
                                style={styles.row}
                                textStyle={styles.text}
                            />
                        </TableWrapper>
                    </Table>
                </Content>

                <FooterTabs />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff',
    },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: { height: 28 },
    text: { textAlign: 'center' },
});
