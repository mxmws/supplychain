import React, { Fragment, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import supplyChain from "../contract"; // Import your supplyChain contract
import { Link } from "react-router-dom";


import cytoscape from 'cytoscape'


const Graph = () => {
    const graphRef = useRef(null);

    let cyStyle = {
        width: '70%',
        height: '60vh',
        margin: '20px 0px'
    };

    const { productAddress } = useParams();

    const drawGraph = () => {
        var cy = cytoscape({
            container: graphRef.current,

            boxSelectionEnabled: false,
            autounselectify: true,

            style: cytoscape.stylesheet()
                .selector('node')
                .css({
                    'height': 80,
                    'width': 80,
                    'background-fit': 'cover',
                    'border-color': '#000',
                    'border-width': 3,
                    'border-opacity': 0.5,
                    'content': 'data(name)',
                    'text-valign': 'bottom', // Align text to the top
                    'text-halign': 'center',
                    'text-margin-y': '8px', // Add margin below the text
                    'text-background-color': '#fff', // Background color behind the text
                    'text-background-opacity': 1, // Opacity of the background
                    'color': '#000',
                    'font-size': '20px'
                })
                .selector('.eating')
                .css({
                    'border-color': 'red'
                })
                .selector('.eater')
                .css({
                    'border-width': 9
                })
                .selector('edge')
                .css({
                    'curve-style': 'bezier',
                    'width': 6,
                    'source-arrow-shape': 'triangle',
                    'line-color': '#ccc',
                    'source-arrow-color': '#ccc'
                }),

            elements: {
                nodes: [],
                edges: []
            },

            layout: {
                name: 'preset', // Change the layout to 'preset'
                positions: function (node) {
                    if (node.id() === 'car') {
                        return { x: 0, y: 0 }; // Position the 'car' node at the top-left corner
                    } else {
                        return undefined; // Use default position for other nodes
                    }
                },
                padding: 10
            }
        });

        cy.userZoomingEnabled(false);

        function addNodes(nodes) {
            var elements = {
                nodes: [],
                edges: []
            };

            nodes.forEach(function (node) {

                // Create a new node
                var newNode = {
                    data: {
                        name: node.name,
                        id: node.id,
                        imageUrl: node.imageUrl
                    }
                };

                elements.nodes.push(newNode);

                // If a source node ID is provided, create a new edge connecting the new node to the source node
                if (node.source) {
                    var newEdge = {
                        data: {
                            source: node.source,
                            target: node.id
                        }
                    };
                    elements.edges.push(newEdge);
                }
            });

            // Add all nodes and edges to the graph
            cy.add(elements);

            // Update the layout to accommodate the new nodes
            cy.layout({ name: 'breadthfirst' }).run();
        }

        // Define an array of nodes
        /*
        var existingNodes = [
            { name: 'car', imageUrl: '_https://live.staticflickr.com/1261/1413379559_412a540d29_b.jpg' },
            { source: 'car', name: 'wheel', imageUrl: '_https://live.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg' },
            { source: 'wheel', name: 'tire', imageUrl: '_https://live.staticflickr.com/3063/2751740612_af11fb090b_b.jpg' },
            { source: 'tire', name: 'rubber', imageUrl: '_https://live.staticflickr.com/8316/8003798443_32d01257c8_b.jpg' },
            { source: 'wheel', name: 'rim', imageUrl: '_https://live.staticflickr.com/6098/6224655456_f4c3c98589_b.jpg' },
            { source: 'rim', name: 'aluminum', imageUrl: '_https://live.staticflickr.com/3866/14420309584_78bf471658_b.jpg' },
            { source: 'rim', name: 'paint', imageUrl: '_https://live.staticflickr.com/2660/3715569167_7e978e8319_b.jpg' }
        ];
        */

        const fetchProducts = async (startAddress) => {

            var existingNodes = []
            var address_pairs = []
            try {
                // Call the getProduct function of supplyChain contract
                const product = await supplyChain.getProduct(startAddress)
                existingNodes.push({ name: product._name, id: startAddress, imageUrl: 'asdf'})
                address_pairs.push({ address: startAddress, successors: product.predecessors })
                

                
                var arrayLength = address_pairs[0].successors.length;
                for (var i = 0; i < arrayLength; i++) {
                    const successor_address = address_pairs[0].successors[i]
                    if (successor_address == "0x0000000000000000000000000000000000000000"){
                        continue;
                    }
                    const successor_product = await supplyChain.getProduct(successor_address)
                    existingNodes.push({ source: address_pairs[0].address, id: successor_address, name: successor_product._name, imageUrl: 'asdf'});
                    
                }
                
                addNodes(existingNodes);

            } catch (error) {
                console.error(error)
                //alert(error)
            }
        }
        fetchProducts(productAddress)





        /*
        cy.on('cxttap', 'node', function(){
          var nodes = this;
          var tapped = nodes;
          var food = [];
        
          nodes.addClass('eater');
        
          for(;;){
            var connectedEdges = nodes.connectedEdges(function(el){
              return !el.target().anySame( nodes );
            });
        
            var connectedNodes = connectedEdges.targets();
        
            Array.prototype.push.apply( food, connectedNodes );
        
            nodes = connectedNodes;
        
            if( nodes.empty() ){ break; }
          }
        
          var delay = 0;
          var duration = 500;
          for( var i = food.length - 1; i >= 0; i-- ){ (function(){
            var thisFood = food[i];
            var eater = thisFood.connectedEdges(function(el){
              return el.target().same(thisFood);
            }).source();
        
            thisFood.delay( delay, function(){
              eater.addClass('eating');
            } ).animate({
              position: eater.position(),
              css: {
                'width': 10,
                'height': 10,
                'border-width': 0,
                'opacity': 0
              }
            }, {
              duration: duration,
              complete: function(){
                thisFood.remove();
              }
            });
        
            delay += duration;
          })(); } // for
        
        }); // on tap
        */
        cy.on('tap', 'node', function(event){
          var node = this;
          var link = '/product_info/' + node.id();
          window.location.href = link;
        });
      
    }

    useEffect(() => {
        drawGraph();
    }, [productAddress])

    return (
        <Fragment>
            <div ref={graphRef} style={cyStyle}>
            </div>
        </Fragment>
    );
};

export default Graph;