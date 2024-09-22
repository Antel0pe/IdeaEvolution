import pandas as pd
from scipy.spatial.distance import pdist, squareform
from Bio.Phylo.TreeConstruction import DistanceTreeConstructor, DistanceMatrix
from Bio import Phylo
import matplotlib.pyplot as plt
import numpy as np

# Step 1: Read the CSV data
csv_file = 'ACosmicHuntInTheBerberSky-Dataset.csv'  # Update this path if necessary
try:
    data = pd.read_csv(csv_file)
except Exception as e:
    print(f"Error reading CSV file: {e}")
    exit(1)

# Step 2: Verify the number of columns
expected_columns = 1 + 47  # 'Sentence' + 48 taxa
actual_columns = data.shape[1]
if actual_columns != expected_columns:
    print(f"Error: Expected {expected_columns} columns, but got {actual_columns}.")
    exit(1)

# Step 3: Check for missing values
if data.isnull().values.any():
    print("Error: The data contains missing values. Please handle them before proceeding.")
    print(data[data.isnull().any(axis=1)])
    exit(1)

# Step 4: Transpose the data so that taxa are languages, and characters are sentences
data.set_index('Sentence', inplace=True)
data_transposed = data.transpose()

# Get taxa (language) names
taxa = data_transposed.index.tolist()

# Step 5: Verify the number of taxa
if len(taxa) != 47:
    print(f"Error: Expected 47 taxa, but got {len(taxa)}.")
    exit(1)

print("Transposed Data:")
print(data_transposed.head())

# Step 6: Compute the distance matrix using Hamming distance
# Hamming distance calculates the proportion of differing characters
distance_matrix = pdist(data_transposed.values, metric='hamming')

# Convert the distance matrix to a square form
square_dm = squareform(distance_matrix)

# Step 7: Verify the distance matrix shape
print(f"\nNumber of taxa: {len(taxa)}")
print(f"Distance matrix shape: {square_dm.shape}")

# Step 8: Extract the lower triangle from the square distance matrix
def get_lower_triangle(square_matrix):
    """
    Extracts the lower triangle of a square matrix in a format suitable for DistanceMatrix.
    Each row i contains the distances from taxa[i] to taxa[0] through taxa[i-1].
    """
    lower_triangle = []
    for i in range(len(square_matrix)):
        row = list(square_matrix[i, :i])
        lower_triangle.append(row)
    return lower_triangle

lower_triangle = get_lower_triangle(square_dm)

# Step 9: Debugging - Verify the lower triangle structure
print("\nVerifying the lower triangle format:")
error_found = False
for i, row in enumerate(lower_triangle):
    expected_length = i
    actual_length = len(row)
    if actual_length != expected_length:
        print(f"Error: Taxon '{taxa[i]}' has {actual_length} distances, expected {expected_length}.")
        error_found = True
    # Optional: Print the first few distance entries for inspection
    if i < 5:
        print(f"Taxon '{taxa[i]}' distances: {row}")

if error_found:
    print("\nPlease review the above errors and ensure that each taxon has the correct number of distance entries.")
    exit(1)
else:
    print("\nAll taxa have the correct number of distance entries.")

print(lower_triangle)
# Step 10: Create the DistanceMatrix object
try:
    dm = DistanceMatrix(names=taxa, matrix=lower_triangle)
    print("\nDistanceMatrix successfully created.")
except ValueError as ve:
    print(f"\nError creating DistanceMatrix: {ve}")
    exit(1)

# Step 11: Construct the tree using UPGMA
constructor = DistanceTreeConstructor()
tree = constructor.upgma(dm)

# Step 12: Visualize the tree
plt.figure(figsize=(20, 10))  # Adjust the size as needed
Phylo.draw(tree, do_show=False)
plt.title("Phylogenetic Tree of Languages (UPGMA)", fontsize=15)
plt.show()

# Optional: Save the tree to a file in Newick format
Phylo.write(tree, "output_tree.newick", "newick")

print("\nPhylogenetic tree has been saved to 'output_tree.newick'")
