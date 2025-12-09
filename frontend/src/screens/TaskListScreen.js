import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { COLORS } from '../constants/colors';

const TaskListScreen = ({ navigation }) => {
  // STATE - Store tasks
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // FETCH TASKS on screen load
  useEffect(() => {
    fetchTasks();
  }, []);

  // FETCH TASKS FROM BACKEND
  const fetchTasks = async () => {
    setLoading(true);
    try {
      // TODO: Replace with real API call
      // const response = await fetch('http://localhost:5000/api/tasks', {
      //   headers: { Authorization: `Bearer ${token}` },
      // });
      // const data = await response.json();
      // setTasks(data.tasks);

      // DUMMY DATA for testing
      setTasks([
        {
          id: 1,
          title: 'Study JavaScript',
          description: 'Learn closures and promises',
          dueDate: '2025-12-15',
          status: 'pending',
        },
        {
          id: 2,
          title: 'Complete React project',
          description: 'Build task management app',
          dueDate: '2025-12-10',
          status: 'pending',
        },
        {
          id: 3,
          title: 'Review code',
          description: 'Check pull requests',
          dueDate: '2025-12-08',
          status: 'done',
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  // RENDER each task item
  const renderTaskItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.taskCard,
        item.status === 'done' && styles.completedTask,
      ]}
      onPress={() => {
        // TODO: Navigate to task detail or edit screen
        Alert.alert('Task', item.title);
      }}
    >
      <View style={styles.taskHeader}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <View
          style={[
            styles.statusBadge,
            item.status === 'done' ? styles.doneBadge : styles.pendingBadge,
          ]}
        >
          <Text style={styles.statusText}>
            {item.status === 'done' ? '✓' : '○'}
          </Text>
        </View>
      </View>

      <Text style={styles.taskDescription}>{item.description}</Text>

      <Text style={styles.dueDate}>Due: {item.dueDate}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Crush</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddTask')}
        >
          <Text style={styles.addButtonText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      {/* TASK LIST */}
      {tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tasks yet</Text>
          <Text style={styles.emptySubtext}>
            Create your first task to get started
          </Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          renderItem={renderTaskItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          onRefresh={fetchTasks}
          refreshing={loading}
        />
      )}

      {/* BOTTOM NAVIGATION */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Tasks</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('TaskHistory')}
        >
          <Text style={styles.navText}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  addButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  addButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  listContainer: {
    padding: 15,
  },
  taskCard: {
    backgroundColor: COLORS.white,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
    padding: 15,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  completedTask: {
    opacity: 0.6,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    flex: 1,
  },
  statusBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  doneBadge: {
    backgroundColor: COLORS.accent,
  },
  pendingBadge: {
    backgroundColor: COLORS.lightGray,
    borderWidth: 2,
    borderColor: COLORS.secondary,
  },
  statusText: {
    fontSize: 16,
    color: COLORS.white,
  },
  taskDescription: {
    fontSize: 14,
    color: COLORS.lightGray,
    marginBottom: 8,
  },
  dueDate: {
    fontSize: 12,
    color: COLORS.secondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.lightGray,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    paddingVertical: 12,
  },
  navItem: {
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  navText: {
    fontSize: 14,
    color: COLORS.secondary,
    fontWeight: '600',
  },
});

export default TaskListScreen;