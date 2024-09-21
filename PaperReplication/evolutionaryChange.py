import pandas as pd
from scipy.spatial.distance import pdist, squareform
from scipy.cluster.hierarchy import linkage, to_tree
from Bio import Phylo
from io import StringIO
import matplotlib.pyplot as plt

# Step 1: Read the CSV data
# Replace 'data.csv' with the path to your CSV file
data = pd.read_csv('ACosmicHuntInTheBerberSky-Dataset.csv')

# Step 2: Transpose the data so that taxa are languages, and characters are sentences
# Set 'Sentence' as the index
data.set_index('Sentence', inplace=True)
# Transpose the DataFrame
data_transposed = data.transpose()

# Display the transposed data (optional)
print("Transposed Data:")
print(data_transposed.head())

# Step 3: Compute the distance matrix
# Use Hamming distance (number of differing characters)
# Since Hamming distance in scipy's 'hamming' metric returns the proportion of differing bits,
# multiply by the number of bits to get the actual count
num_bits = data_transposed.shape[1]
distance_matrix = pdist(data_transposed.values, metric='hamming') * num_bits

# Convert the distance matrix to a condensed form if needed
# (Linkage function accepts condensed distance matrices)
print("\nDistance Matrix (Condensed):")
print(distance_matrix)

# Step 4: Perform hierarchical clustering using UPGMA
linked = linkage(distance_matrix, method='average')  # 'average' corresponds to UPGMA

# Step 5: Convert the linkage matrix to Newick format
def get_newick(node, parent_distance, leaf_names, newick=''):
    """
    Recursively traverse the tree to generate a Newick string.
    """
    if node.is_leaf():
        return f"{leaf_names[node.id]}:{parent_distance - node.dist:.2f}"
    else:
        left_newick = get_newick(node.get_left(), node.dist, leaf_names)
        right_newick = get_newick(node.get_right(), node.dist, leaf_names)
        return f"({left_newick},{right_newick})"

# Convert the linkage matrix to a tree
tree = to_tree(linked, rd=True)

# Get leaf names
leaf_names = data_transposed.index.tolist()

# Generate Newick string
newick_str = get_newick(tree, tree.dist, leaf_names) + ";"

print("\nNewick Tree:")
print(newick_str)

# Step 6: Parse the Newick string with Bio.Phylo and visualize it
phylo_tree = Phylo.read(StringIO(newick_str), "newick")

# Draw the tree
plt.figure(figsize=(20, 10))  # Adjust the size as needed
Phylo.draw(phylo_tree, do_show=False)
plt.title("Phylogenetic Tree of Languages (UPGMA)", fontsize=15)
plt.show()

# Optional: Save the tree to a file in Newick format
with open("output_tree.newick", "w") as f:
    f.write(newick_str)

print("\nPhylogenetic tree has been saved to 'output_tree.newick'")
